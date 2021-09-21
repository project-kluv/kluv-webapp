var mongoose = require('mongoose');

const coin = new mongoose.Schema({
  name: String,
  price: String,
});

const mongoTest = async function (name, price, callbak) {
  console.log("[service] ------> mongoTest")
   // Promise Based  
    coin.create({name:name, price:price}).then(function(results) {
      // console.log('== Resolved\n', results);
      console.log('Promise Based Insert Result : ', results);
  }, function(err) {
      console.log('== Rejected\n', err);      
  });

  callbak({ success: true, response: "aa" })
}


module.exports = {
  mongoTest: mongoTest,
  coin : mongoose.model('coin', coin)
}