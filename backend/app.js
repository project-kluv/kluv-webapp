
var cron = require('node-cron');
const tokenService = require('./apps/token/tokenService')


process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';
if (process.env.NODE_ENV == 'production') {
  console.log("Production Mode Started");
} else if (process.env.NODE_ENV == 'development') {
  console.log("Development Mode Started");
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const db = require('./utils/db.js'); // db 불러오기
db(); // 실행
// 라이브 서버 설정
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));

// // in app.js (or similar)
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");


//   }, 100);
// });

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var accountRouter = require('./routes/accountRouter');
var poolRouter = require('./routes/poolRouter');
var votingRouter = require('./routes/votingRouter');
var tokenRouter = require('./routes/tokenRouter');

var testRouter  = require('./routes/testRouter');

var app = express();

// app.use(connectLivereload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/user', userRouter);
app.use('/web/account', accountRouter);
app.use('/web/pool', poolRouter);
app.use('/web/voting', votingRouter);
app.use('/web/test', testRouter);
app.use('/web/token', tokenRouter);
app.use('/v1/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//production 에서만 데이터 insert
if (process.env.NODE_ENV == 'production') {
  cron.schedule('0 */10 * * * *', function(){
    tokenService.insertTokenInfo()
  });
}

module.exports = app;
