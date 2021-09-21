const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://root:fomo123%23@kluv.me:5003',{ useNewUrlParser: true}, function(err) {
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