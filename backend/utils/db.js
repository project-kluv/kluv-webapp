const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://34.64.153.180:5003/admin', 
    { "user" :"root",
    "pass":"fomo123#",
    dbName: 'kluv',
      useNewUrlParser: true,
       useUnifiedTopology: true }, 
    function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      console.log('mongodb connected');
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
 // require('./user.js'); // user.js는 나중에 만듭니다.
};