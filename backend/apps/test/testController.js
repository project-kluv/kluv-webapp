const testService = require('./testService')

const mongoTest = function(req, res){
  console.log("[Controller] ------> mongoTest")
  const name = req.params.name
  const price = req.params.price
  
  console.log(name + "," + price)
  

  rtn = testService.mongoTest(name, price, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
}

module.exports = {
  mongoTest:mongoTest
}