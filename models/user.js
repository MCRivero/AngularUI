var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var SALT_FACTOR = 10;

var lengthUsername = function (val){
	if (val && val.length >= 5 ){
		return true;
	} 
	return false;
};

var DatauserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true , validate: { validator: lengthUsername, msg: 'Too short'  }},
    password: { type: String, required: true }
});

var noop = function(){};

DatauserSchema.pre('save', function(done) {
	var user = this;
	if (!user.isModified('password')) {
		return done();
	}
	bcrypt.genSalt( SALT_FACTOR, function(err, salt) {
		if (err) { console.log(' error : ' + err); 
				   return done(err); 
				 }
		bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) { 
			if (err) { 
				console.log(' error bcrypt : ' + err);
				return done(err); }
			user.password = hashedPassword;
			done();
		});
	});
});

DatauserSchema.methods.checkPassword = function(guess, done){
	bcrypt.compare(guess, this.password, function(err, isMatch){
		done(err, isMatch);
	});
};

DatauserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    password: this.password,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('Datauser', DatauserSchema);