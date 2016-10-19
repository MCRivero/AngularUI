var express = require("express");

var passport = require("passport");

var User = require('../models/user');

var api = express.Router();

/*
api.get('/', function(req, res, next){
    User.find()
	.sort({ userName : "descending" })
	.exec(function(err, users){
		if (err){ return next(err); }
		res.render("index", { users: users });
	});
});  
*/
api.post('/signup', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
	
	User.findOne({ username: req.body.username }, function(err, user, next){
		if (err){ return next(err); }
		
		/*
		if (user){
			//req.flash("error", "User already exists");
			console.log('Usuario existe');
			return res.json(err);		
		}
		*/
		var newUser = new User({
			username: req.body.username,
			password: req.body.password
		});
		
		console.log(' Saving ... ');

		newUser.save(function(err, user){
            if (err) {
				console.log(' err : ' + JSON.stringify(err));
				return res.json(err);
			};		
			
			var token;
			
			token = user.generateJwt();
			
			res.status(200);
				
			res.json({
				'token': token
			});
		});	
	});
}); 

api.post('/login', function(req, res, next) {
	
		//console.log('USER : ' + JSON.stringify(user));
		//user = 	req.body.username;
		passport.authenticate("login", function(err, user, info) {
			
			if (info) { console.log (info); res.json(info) };
			
			var token = user.generateJwt();

				res.status(200);

				res.json({
					'token': token
				});   
		})(req, res, next);
	//});
});


module.exports = api;