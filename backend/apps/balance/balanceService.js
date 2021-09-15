const axios = require('axios')
const fs = require('fs')
const poolService = require('../pool/poolService.js')
const utils = require('../../utils/commonUtils.js')

const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));
const KLAYSWAP_LPTOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapLPTokenInfo.json", 'utf8'));


const getBalance = async function(account, callbak) {
	console.log("[service] ------> getAccountBalance")
  try {
    // 1. KLAYSWAP LP + 토큰 잔고 가져오기
    const exchangeList = ['klayswap', 'klaymore'] // 거래소 목록


    // 가격 정보를 미리 받아옴 (Klayswap 기준)
    const lpPools = await poolService.getAllLPPool('klayswap')
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
  
        const balanceBookContract = utils.getContract(appName , "BALANCE_BOOK")
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
                "name": tokenPriceInfo.name,
                "symbol": tokenPriceInfo.symbol,
                "balance": balanceSum,
                "priceUsdt": tokenPriceInfo.price * balanceSum
              })
            }
          }
          result.lpBalance = resultAll.lpBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          result.tokenBalance = resultAll.tokenBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          result.totalBalance = resultAll.totalBalance.filter(function (obj) { return obj.priceUsdt > 1 })
          result.totalUsdt = resultAll.totalUsdt
  
          // 2. KSP Pending Rewards 가져오기 -> 함수화 시켜야함 
          pendingRewards = await this.getPendingRewards(appName, account)
          if (pendingRewards['KSP']['LP'].length > 0 || pendingRewards['KSP']['VOTING'].length > 0) {
            result.pendingRewards = pendingRewards
          }
  
        } else throw new Error("요청한 건수와 결과 건수가 다릅니다")
        
      } else if (appName === 'klaymore') {
        // klaymoreURL = 'https://klaymore-mainnet.du.r.appspot.com/balance/'+account
        // klaymoreReq = await axios.get(klaymoreURL)
        // klaymoreResult = klaymoreReq.data['tokens']
        // console.log(klaymoreResult)
        
        // for (const tokenName in klaymoreResult) {
        //   if (tokenName === 'HOUSE') {
        //     console.log("HOUSE 단일 스테이킹")

        //     tokenAddress = '0x158BeFF8C8cDEbD64654ADD5F6A1d9937e73536c'
        //     tokenDecimals = KLAYSWAP_TOKEN_INFO[tokenAddress]['decimals']
        //     tokenAmount = klaymoreResult[tokenName].staked / 10**tokenDecimals
        //     console.log(tokenAmount)
        //     console.log(tokenPrice)
          
        //   } else if (tokenName === 'AKLAY') {
        //     console.log("AKLAY 단일 스테이킹")
        //   } else if (['KLAYAKLAYLP', 'KLAYHOUSELP', 'AKLAYHOUSELP', 'HOUSEWOODLP'].includes(tokenName)) {
        //     console.log("LP 스테이킹")
        //   }
        // }
        // console.log(result.tokenBalance)
        continue
      } else throw new Error("거래소 목록 오류")
    }
    callbak({ success: true, response: result })
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getPendingRewards = async function (appName, account) {
  console.log("[service] ------> getPendingRewards")
  try {
    if (appName === 'klayswap') {
      let pendingRewards = { 'KSP': { 'LP': [], 'PENDING_KSP': 0, 'LOCKED_KSP': 0, 'VOTING': [] } }
      const factoryViewContract = utils.getContract(appName, "FACTORY_VIEW")
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
      const poolVotingViewContract = utils.getContract(appName, "POOL_VOTING_VIEW")
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