const axios = require('axios')
const xmlhttp = require('xmlhttprequest')

//환율
function getUsdkrw(callback) {
    axios.get("https://earthquake.kr:23490/query/usdkrw")
    .then(response => {
        callback(response.data.usdkrw[0])
    })
    .catch(error => {
        callback({success : false , message: error.message})
    });
}

//환율
async function getUsdkrw2() {
    let rtn ='';
    await axios.get("https://earthquake.kr:23490/query/usdkrw")
    .then(response => {
        rtn = response.data.usdkrw[0]
    })
    .catch(error => {
        rtn = {success : false , message: error.message}
    });

    return rtn;
}


//환율
 function getUsdkrw3() {
    var request = new xmlhttp.XMLHttpRequest();
    request.open('GET', 'https://earthquake.kr:23490/query/usdkrw', false);  // `false` makes the request synchronous
    request.send(null)
    let rtn = 0;
    if (request.status === 200) {
      return  JSON.parse(request.responseText).usdkrw[0]
    }
}


  module.exports = {
    getUsdkrw: getUsdkrw,
    getUsdkrw2: getUsdkrw2,
    getUsdkrw3: getUsdkrw3,
};