const axios = require('axios')

let getAccountFromExternal = function(account, callbak){
	
	console.log("[service] ------> getAccountInfo")

	axios.get("https://api-cypress.scope.klaytn.com/v1/accounts/"+ account)
		.then(response => {
			a= response.dat
				callbak({success : true , response: response.data})
		})
		.catch(error => {
				callbak({success : false , message: error.message})
		});
};

module.exports = {
	getAccountFromExternal: getAccountFromExternal
};

