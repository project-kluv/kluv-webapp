const axios = require('axios')
const fs = require('fs')
const poolService = require('../pool/poolService.js')
const utils = require('../../utils/commonUtils.js')


const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));
const KLAYSWAP_LPTOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapLPTokenInfo.json", 'utf8'));


const getBalance = async function(account, authName, callbak) {
	console.log("[service] ------> getAccountBalance")
  try {
    // 1. KLAYSWAP LP + 토큰 잔고 가져오기
    const exchangeList = ['klayswap', 'klaymore'] // 거래소 목록


    // 가격 정보를 미리 받아옴 (Klayswap 기준)
    const lpPools = await poolService.getAllLPPool('klayswap', authName)
    const tokenPriceAll = poolService.getTokenPriceInApp('klayswap', lpPools)

    const lpPrice = tokenPriceAll['lp']
    const tokenPrice = tokenPriceAll['token']

    // 결과 리턴값 초기화
    let resultAll = { lpBalance: [], tokenBalance: [], totalBalance: [], totalUsdt: 0 }
    let result = { lpBalance: [], tokenBalance: [], totalBalance: [], totalUsdt: 0, pendingRewards: {} }
    for (let i = 0; i < exchangeList.length; i++) {
      const appName = exchangeList[i]      
      if (appName === 'klayswap') {
        // const lpPools = await poolService.getAllLPPool(appName)
        // const tokenPriceAll = poolService.getTokenPriceInApp(appName, lpPools)
  
        // const lpPrice = tokenPriceAll['lp']
        // const tokenPrice = tokenPriceAll['token']
        
        const lpAddressList = Object.keys(lpPrice)
        const tokenAddressList = Object.keys(tokenPrice)
        const allAddressList = lpAddressList.concat(tokenAddressList)
  
        const balanceBookContract = utils.getContract(appName , "BALANCE_BOOK", authName)
        let balances
        await balanceBookContract.methods.balanceOf(account, allAddressList).call()
          .then(response => {
            balances = response
          })
          .catch(error => {
            callbak({
              success: false,
              message: error.message
            })
          });
        if (allAddressList.length === balances.length) {
          for (let i = 0; i < balances.length; i++) {
            if (i < lpAddressList.length) {
              lpPriceInfo = lpPrice[allAddressList[i]]
              lpBalance = Number(balances[i])
              resultAll.lpBalance.push({
                "address": allAddressList[i],
                "name": lpPriceInfo.name,
                "balance": lpBalance / 10 ** lpPriceInfo.decimals,
                "tokenA": {
                  "address": lpPriceInfo.tokenA,
                  "symbol": lpPriceInfo.tokenASymbol,
                  "name": lpPriceInfo.tokenAName,
                  "balance": lpBalance * lpPriceInfo.tokenAUnit / 10 ** tokenPrice[lpPriceInfo.tokenA].decimals,
                },
                "tokenB": {
                  "address": lpPriceInfo.tokenB,
                  "symbol": lpPriceInfo.tokenBSymbol,
                  "name": lpPriceInfo.tokenBName,
                  "balance": lpBalance * lpPriceInfo.tokenBUnit / 10 ** tokenPrice[lpPriceInfo.tokenB].decimals,
                },
                "priceUsdt": lpPriceInfo.price * lpBalance / 10 ** lpPriceInfo.decimals
              })
              resultAll.totalUsdt += lpPriceInfo.price * lpBalance / 10 ** lpPriceInfo.decimals
            } else {
              tokenPriceInfo = tokenPrice[allAddressList[i]]
              tokenBalance = Number(balances[i])
              resultAll.tokenBalance.push({
                "address": allAddressList[i],
                "symbol": tokenPriceInfo.symbol,
                "name": tokenPriceInfo.name,
                "balance": tokenBalance / 10 ** tokenPriceInfo.decimals,
                "priceUsdt": tokenPriceInfo.price * tokenBalance / 10 ** tokenPriceInfo.decimals
              })
              resultAll.totalUsdt += tokenPriceInfo.price * tokenBalance / 10 ** tokenPriceInfo.decimals
  
              // Balance Detail
              balanceSum = tokenBalance / 10 ** tokenPriceInfo.decimals
              searchTokenInLP = resultAll.lpBalance.filter(function (obj) {
                return (obj.tokenA.address == allAddressList[i]) || (obj.tokenB.address == allAddressList[i]);
              })
  
              if (searchTokenInLP.length > 0) {
                for (let j = 0; j < searchTokenInLP.length; j++) {
                  const lpDetail = searchTokenInLP[j];
                  if (lpDetail.tokenA.address == allAddressList[i]) balanceSum += lpDetail.tokenA.balance
                  else balanceSum += lpDetail.tokenB.balance
                }
              }
              resultAll.totalBalance.push({
                "address": allAddressList[i],
                "symbol": tokenPriceInfo.symbol,
                "name": tokenPriceInfo.name,
                "balance": balanceSum,
                "priceUsdt": tokenPriceInfo.price * balanceSum
              })
            }
          }
          // result.lpBalance = resultAll.lpBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          // result.tokenBalance = resultAll.tokenBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          // result.totalBalance = resultAll.totalBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          // result.totalUsdt = resultAll.totalUsdt
  
          // 2. KSP Pending Rewards 가져오기 -> 함수화 시켜야함 
          pendingRewards = await this.getPendingRewards(appName, account, authName)
          if (pendingRewards['KSP']['LP'].length > 0 || pendingRewards['KSP']['VOTING'].length > 0) {
            result.pendingRewards = pendingRewards
          }
  
        } else throw new Error("요청한 건수와 결과 건수가 다릅니다")
        
      } else if (appName === 'klaymore') {
        klaymoreURL = 'https://klaymore-mainnet.du.r.appspot.com/balance/'+account
        klaymoreReq = await axios.get(klaymoreURL)
        klaymoreResult = klaymoreReq.data['tokens']
        
        let pendingMore = {'WOOD':0, 'HOUSE':0, 'AKLAY':0}

        for (const tokenName in klaymoreResult) {
          if (tokenName === 'HOUSE' || tokenName === 'AKLAY' ) { // 단일 스테이킹
            tokenAddress = tokenName === 'HOUSE'? '0x158BeFF8C8cDEbD64654ADD5F6A1d9937e73536c' : '0x74BA03198FEd2b15a51AF242b9c63Faf3C8f4D34'
            tokenDecimals = KLAYSWAP_TOKEN_INFO[tokenAddress]['decimals']
            tokenAmount = klaymoreResult[tokenName].staked / 10**tokenDecimals
            
            pendingMore['HOUSE'] += Number(klaymoreResult[tokenName]['CHOUSE'])/10**18 + Number(klaymoreResult[tokenName]['CVHOUSE'])/10**18
            if ( tokenName === 'HOUSE') {
              pendingMore['AKLAY'] += Number(klaymoreResult[tokenName]['CAKLAY'])/10**18
              pendingMore['WOOD'] += Number(klaymoreResult[tokenName]['CWOOD'])/10**18
            }

            searchKhouseToken = resultAll.tokenBalance.filter(function (obj) {
              return (obj.address === tokenAddress)
            })
            if (searchKhouseToken.length > 0) {
              for (let i = 0; i < resultAll.tokenBalance.length; i++) {
                const el = resultAll.tokenBalance[i];
                if(el.address === tokenAddress) {
                  el.balance += tokenAmount
                  el.priceUsdt += tokenPrice[tokenAddress]['price'] * tokenAmount
                }
              }
              for (let i = 0; i < resultAll.totalBalance.length; i++) {
                const el = resultAll.totalBalance[i];
                if(el.address === tokenAddress) {
                  el.balance += tokenAmount
                  el.priceUsdt += tokenPrice[tokenAddress]['price'] * tokenAmount
                }
              }
            } else {
              resultAll.tokenBalance.push({
                "address": tokenAddress,
                "symbol": KLAYSWAP_TOKEN_INFO[tokenAddress]['symbol'],
                "name": KLAYSWAP_TOKEN_INFO[tokenAddress]['name'],
                "balance": tokenAmount,
                "priceUsdt": tokenPrice[tokenAddress]['price'] * tokenAmount
              })
              resultAll.totalBalance.push({
                "address": tokenAddress,
                "symbol": KLAYSWAP_TOKEN_INFO[tokenAddress]['symbol'],
                "name": KLAYSWAP_TOKEN_INFO[tokenAddress]['name'],
                "balance": tokenAmount,
                "priceUsdt": tokenPrice[tokenAddress]['price'] * tokenAmount
              })
            }
            resultAll.totalUsdt += tokenPrice[tokenAddress]['price'] * tokenAmount

          } else if (['KLAYAKLAYLP', 'KLAYHOUSELP', 'AKLAYHOUSELP', 'HOUSEWOODLP'].includes(tokenName)) { // lp 스테이킹
            
            if (tokenName === 'KLAYAKLAYLP') lpTokenAddress = '0xE74C8D8137541C0EE2C471cdAF4DCf03C383Cd22'
            else if (tokenName === 'KLAYHOUSELP') lpTokenAddress = '0x8ad37f3f3fB663A67c7140947F80894a973B789B'
            else if (tokenName === 'AKLAYHOUSELP') lpTokenAddress = '0xafEDb9fd20d0007a13DcD685a89825cd2866f0fc'
            else if (tokenName === 'HOUSEWOODLP') lpTokenAddress = '0xF05200168fF2e1b0848Cf4981184017F94710Fa6'

            lpTokenDecimals = KLAYSWAP_LPTOKEN_INFO[lpTokenAddress]['decimals']
            lpTokenAmount = klaymoreResult[tokenName].staked / 10**tokenDecimals
            
            pendingMore['HOUSE'] += Number(klaymoreResult[tokenName]['CHOUSE'])/10**18 + Number(klaymoreResult[tokenName]['CVHOUSE'])/10**18

            tokens = [lpPrice[lpTokenAddress]['tokenA'], lpPrice[lpTokenAddress]['tokenB']]
            for (let i = 0; i < tokens.length; i++) {
              tokenAmount = i===0 ? lpTokenAmount*lpPrice[lpTokenAddress]['tokenAUnit'] : lpTokenAmount*lpPrice[lpTokenAddress]['tokenBUnit']
              searchKhouseToken = resultAll.totalBalance.filter(function (obj) {
                return (obj.address === tokens[i])
              })
              
              if (searchKhouseToken.length > 0) {
                for (let j = 0; j < resultAll.totalBalance.length; j++) {
                  const el = resultAll.totalBalance[j];
                  if(el.address === tokens[i]) {
                    el.balance += tokenAmount
                    el.priceUsdt += tokenPrice[tokens[i]]['price'] * tokenAmount
                  }
                }
              } else {
                resultAll.totalBalance.push({
                  "address": tokens[i],
                  "symbol": KLAYSWAP_TOKEN_INFO[tokens[i]]['symbol'],
                  "name": KLAYSWAP_TOKEN_INFO[tokens[i]]['name'],
                  "balance": tokenAmount,
                  "priceUsdt": tokenPrice[tokens[i]]['price'] * tokenAmount
                })
              }
              resultAll.totalUsdt += tokenPrice[tokens[i]]['price'] * tokenAmount
            }
          }
        }
        result.pendingRewards['KLAYMORE'] = pendingMore

      } else throw new Error("거래소 목록 오류")
    }

    result.lpBalance = resultAll.lpBalance.filter(function (obj) { return obj.priceUsdt > 1 })
    result.tokenBalance = resultAll.tokenBalance.filter(function (obj) { return obj.priceUsdt > 1 })
    result.totalBalance = resultAll.totalBalance.filter(function (obj) { return obj.priceUsdt > 1 })
    result.totalUsdt = resultAll.totalUsdt
    // console.log(result.pendingRewards)

    callbak({ success: true, response: result })
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getPendingRewards = async function (appName, account, authName) {
  console.log("[service] ------> getPendingRewards")
  try {
    if (appName === 'klayswap') {
      let pendingRewards = { 'KSP': { 'LP': [], 'PENDING_KSP': 0, 'LOCKED_KSP': 0, 'VOTING': [] } }
      const factoryViewContract = utils.getContract(appName, "FACTORY_VIEW", authName)
      const fullData = await factoryViewContract.methods.getFullData().call()
      const poolCount = Number(fullData['poolCount'])
      const userData = await factoryViewContract.methods.getUserData(account, 0, poolCount).call()
      for (let index = 0; index < poolCount; index++) {
        c = fullData['mined']
        w = fullData['amountDatas'][index]
        A = fullData['miningDatas'][index]
        P = fullData['miningDatas'][poolCount + index]
        C = (fullData['miningDatas'][2 + poolCount + index]) * (100) / 10000
        r = (C * (P - c)) / 100
        miningIndex = Number(A) + ((r / 10 ** 18) / w)

        if (userData['0'][index] > 0) {
          balanceOf = userData['0'][index]
          userLastIndex = userData['2'][index]
          pendingLPReward = balanceOf * (miningIndex - userLastIndex) / 10 ** (2 * 18)
          pendingRewards['KSP']['LP'].push({
            "pool": fullData["fixedDatas"][index],
            "name": KLAYSWAP_LPTOKEN_INFO[fullData["fixedDatas"][index]].name,
            "amount": pendingLPReward
          })
        }
      }
      // Staking
      const poolVotingViewContract = utils.getContract(appName, "POOL_VOTING_VIEW", authName)
      const userVKSPStat = await poolVotingViewContract.methods.getUserVKSPStat(account).call()
      if (Number(userVKSPStat['balance']) > 0) {
        pendingRewards['KSP']["LOCKED_KSP"] = Number(userVKSPStat["lockedKSP"]) / (10 ** 18)
        pendingRewards['KSP']["PENDING_KSP"] = Number(userVKSPStat['pendingKSP']) / (10 ** 18)
      }
      // Voting 
      const userPoolVogintStat = await poolVotingViewContract.methods.getUserPoolVotingStat(account).call()
      const votingPoolCount = Number(userPoolVogintStat["poolCount"])
      if (votingPoolCount > 0) {
        for (let i = 0; i < votingPoolCount; i++) {
          pendingRewards['KSP']["VOTING"].push({
            "pool": userPoolVogintStat['addrs'][i],
            "name": KLAYSWAP_LPTOKEN_INFO[userPoolVogintStat['addrs'][i]].name,
            "tokenA": userPoolVogintStat["tokens"][2 * i],
            "tokenB": userPoolVogintStat["tokens"][2 * i + 1],
            "tokenAAmount": userPoolVogintStat["pendingRewards"][2 * i] / 10 ** KLAYSWAP_TOKEN_INFO[userPoolVogintStat["tokens"][2 * i]].decimals,
            "tokenBAmount": userPoolVogintStat["pendingRewards"][2 * i + 1] / 10 ** KLAYSWAP_TOKEN_INFO[userPoolVogintStat["tokens"][2 * i + 1]].decimals,
            "tokenASymbol": userPoolVogintStat["symbols"][2 * i],
            "tokenBSymbol": userPoolVogintStat["symbols"][2 * i + 1],
          })
        }
      }
      return pendingRewards
    } else throw new Error("거래소 목록 오류")
  } catch (error) {
    console.log(error.message)
  }
}




module.exports = {
	getBalance: getBalance,
  getPendingRewards: getPendingRewards
};