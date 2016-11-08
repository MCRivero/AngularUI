var express = require("express");

var Teams = require('../models/teams');
var Leagues = require('../models/leagues');

var jwt = require('express-jwt');

var async = require('async') ;

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var api = express.Router();

api.get('/leagues/:id/teams', function(req, res){ 
	console.log('req.params.id : ' + req.params.id);
    Leagues.findById( req.params.id )
		   .populate('teams')
		   .exec(function(err, league, next) {
				console.log('league : ' + league);
        		if (err) return next(err);
        		res.json(league.teams);
    		});
});

/*
api.post('/teams', function(req, res){
    var teams = new Teams();
    teams.name = req.body.name;
    teams.coach = req.body.coach;
    teams.divisionName = req.body.divisionName;
    teams.leagueId = req.body.leagueId;
    teams.save(function(err, result, next){
        if (err) return next(err);
        res.json(result);
    });
}); 
*/

api.post('/teams', function(req, res){
	
	function saveTeams(cb) {
		var teams = new Teams();
		teams.name = req.body.name;
		teams.coach = req.body.coach;
		teams.divisionName = req.body.divisionName;
		teams.save(function(err, team){
			if (err) { console.log('ERROR SAVE TEAMS : ' + err); }
			cb(null, team);
		});

	}
	
	function updateLeagues(team, cb) {
		console.log('*** updateLeagues req.body.leagueId : ' + req.body.leagueId);
		Leagues.findOne({ _id: req.body.leagueId }, function(err, league) {
			if(err) { console.log('ERROR : ' + err); }
			//console.log(' League : ' + JSON.stringify(league));			
			league.teams.push(team._id);
			league.save(function(err, league){
				if (err) console.log(err);
    		});
			console.log(' League : ' + JSON.stringify(league));
			cb(null, team);
		});
	}

	
	function finalCallback(err, team) {
		if (err) { return console.error(err); }
		return res.json(team);
	}
	
	var steps = [saveTeams, updateLeagues];

	async.waterfall(steps, finalCallback);
	
}); 

api.patch('/teams/:id', function(req, res){ 
    
    Teams.findOne({ _id: req.body._id }, function(err, team, next) {
        if (err) return next(err);
		team.name = req.body.name;
		team.coach = req.body.coach;
		team.divisionName = req.body.divisionName;
        team.save(function(err, result, next) {
            if (err) return next(err);
            res.json(result);
        });
    });
});

/*** antes de async
api.delete('/teams/:id', function(req, res){ 
    Teams.findByIdAndRemove(req.params.id, function (err, team, next) { 
        if (err) return next(err);	
        res.status(204).send(team);
    });
});
*/

api.delete('/teams/:id/:leagueId', function(req, res){
	
	function deleteTeam(cb) {
		Teams.findByIdAndRemove(req.params.id, function (err, team) { 
			if (err) { console.log('ERROR SAVE TEAMS : ' + err); }
			cb(null, team);
		});
	}
	
	function updateLeagues(team, cb) {
		console.log(' *** req.params.leagueId : ' + req.params.leagueId);
		Leagues.findOne({ _id: req.params.leagueId }, function(err, league) {
			if(err) { console.log('ERROR : ' + err); }
			//console.log(' *** team ID : ' + req.params.id );
			// ****** 
			//console.log(' **** league.teams **** ' + league.teams);
			league.teams.remove(req.params.id);
			league.save(function(err, league){
				if (err) console.log(err);
    		});
			console.log(' League : ' + JSON.stringify(league));
			cb(null, team);
		});
	}

	function finalCallback(err, team) {
		if (err) { return console.error(err); }
		return res.json(team);
	}
	
	var steps = [deleteTeam, updateLeagues];

	async.waterfall(steps, finalCallback);
	
});

module.exports = api;