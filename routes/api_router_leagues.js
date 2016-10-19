var express = require("express");

var Leagues = require('../models/leagues');

var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var api = express.Router();

api.get('/leagues', function(req, res){
    Leagues.find({}, function(err, leagues, next){
        if(err) return next(err);
        res.json(leagues);
    });
});

api.get('/leagues/:id', function(req, res){ 
    Leagues.findOne({ _id: req.body._id }, function(err, league, next) {
        if (err) return next(err);
        res.json(league);
    });
});

api.post('/leagues', auth, function(req, res){
    var leagues = new Leagues();
    leagues.name = req.body.name;
    leagues.save(function(err, result, next){
        if (err) return next(err);
        res.json(result);
    });
});

api.patch('/leagues/:id', auth, function(req, res){ 
    //console.log('*** patch leagues req body id : ' + req.body._id + ' name : ' + req.body.name);

    Leagues.findOne({ _id: req.body._id }, function(err, league, next) {
        if (err) return next(err);
        if (req.body.name) league.name = req.body.name;
        league.save(function(err, result, next) {
            if (err) return next(err);
            //req.flash('success', 'Successfully Edited your profile');
            res.json(result);
        });
    });
});

api.delete('/leagues/:id', auth, function(req, res, next){ 
	console.log (' auth : ' + JSON.stringify(auth));
    Leagues.findByIdAndRemove(req.params.id, function (err, league, next) {  
        if (err) return next(err);
        res.send(league);
    });
});

// error handlers
// Catch unauthorised errors
api.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

module.exports = api;