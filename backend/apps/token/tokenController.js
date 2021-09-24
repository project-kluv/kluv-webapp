const Token = require('./tokens')

const insert = function(req, res){
  console.log("[Controller] ------> insert")
  const address = req.params.address
  const price = req.params.price

  console.log(address + "," + price)

  const token = new Token({
    address:address,
    price:price
  })

  token.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });

  res.send({test:"success"})
  
}

const get = function(req, res){
  console.log("[Controller] ------> get")
  const address = req.params.address
  var result

  Token.find({ address : address }, (err, tokens) => {
    result = tokens
    console.log(tokens);
    res.send({result:result})
  });
  
}


module.exports = {
  insert:insert,
  get:get
}