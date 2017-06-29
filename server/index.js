let express = require('express'),
    path = require('path');
let favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser');
var passport = require('passport');


const app = express();
var databaseconfig = require('./db.js');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect(databaseconfig.url);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));

// Configuring Passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// must use cookieParser before expressSession
app.use(cookieParser());
var expressSession = require('express-session');
app.use(expressSession({secret: 'Sshhhh'}));


var flash = require('connect-flash');
app.use(flash());

//app.use(express.static(path.join(__dirname, 'public/html')));
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;