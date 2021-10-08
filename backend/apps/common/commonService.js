const axios = require('axios');
const Rate = require('./rate')

const getRateFromThirdParty =  function (){
    axios.get("https://api.manana.kr/exchange/rate.json")
    .then(response => {
        const data = response.data[1]    
        
        Rate.updateOne({name:"USDKRW"},{$set:{name:"USDKRW", rate:data.rate, date:data.date}}, {upsert:true}, function (err, docs) {
            if (err){
                console.log(err)
                console.log("Error update currency rate data")
            }
            else{
                // console.log("Update currency rate data");
            }
        })
    })
    .catch(error => { 
        console.log(error)
        console.log("Error get Currency rate")
   });
}
module.exports = {
    getRateFromThirdParty:getRateFromThirdParty
}
