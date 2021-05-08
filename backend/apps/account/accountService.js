const axios = require('axios')

let getAccountInfo = async function(account, callbak){
    console.log("[service] ------> getAccountInfo")
    console.log("[service] ------> getAccountInfo")
    await axios.get("https://api-cypress.scope.klaytn.com/v1/accounts/"+ account)
        .then(response => {
            console.log("22222222222")
            callbak({success : true , response: response.data})
        })
        .catch(error => {
            console.log("3333333333")
            callbak({success : false , message: error.message})
        });
};

module.exports = {
    getAccountInfo: getAccountInfo
};

