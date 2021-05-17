const axios = require('axios')

//환율
function getUsdkrw(callback) {
    axios.get("https://earthquake.kr:23490/query/usdkrw")
    .then(response => {
        callback({success : true , response: response.data.usdkrw[0]})
    })
    .catch(error => {
        callback({success : false , message: error.message})
    });
}

  module.exports = {
    getUsdkrw: getUsdkrw
};