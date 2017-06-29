var express = require('express');
var router = express.Router();
var authencontroller1 = require('../controller/authenlogin.js');
var authencontroller2 = require('../controller/authensignup.js');
var moviecontroller = require('../controller/moviecontroller.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*------function for my app--------*/
module.exports = function(passport){
    router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});
    /*routes for signup */
router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/index.html',
		failureRedirect: '/signup.html',
		failureFlash : true
	}));
/*routes for login */
router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/signup.html',
		failureFlash : true
	}));


router.get('/movie/search:index', moviecontroller.search);

router.post('/movie/add', moviecontroller.add);

router.get('/movie/view', moviecontroller.view);

router.get('/movie/delete', moviecontroller.delete);

return router;
}
