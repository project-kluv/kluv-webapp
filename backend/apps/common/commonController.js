const Rate = require('./rate')

// const insert = function(req, res){
//     console.log("[Controller] ------> insert")
//     const address = req.params.address
//     const price = req.params.price
  
//     console.log(address + "," + price)
  
//     const token = new Token({
//       address:address,
//       price:price
//     })
  
//     token.save(function(err) {
//       if (err) throw err;
//       console.log('User saved successfully!');
//     });
  
//     res.send({test:"success"})
// }

const get = function(req, res){
    Rate.find({ name : "USDKRW" }, (err, data) => {
      res.send({sucess:true, response:{data:data[0]}})
    });
  }


module.exports = {
    get:get
  }