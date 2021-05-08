const axios = require('axios')

let getAccountInfo = async function(account, callbak){
    
    console.log("[service] ------> getAccountInfo")

    await axios.get("https://api-cypress.scope.klaytn.com/v1/accounts/"+ account)
        .then(response => {
            callbak({success : true , response: response.data})
        })
        .catch(error => {
            callbak({success : false , message: error.message})
        });
};

module.exports = {
    getAccountInfo: getAccountInfo
};

