var express = require("express");

var Teams = require('../models/teams');

var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var api = express.Router();

api.get('/leagues/:id/teams', function(req, res){ 
    Teams.find({ leagueId: req.params.id }, function(err, teams, next) {
        if (err) return next(err);
        res.json(teams);
    });
});

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

api.delete('/teams/:id', function(req, res){ 
    Teams.findByIdAndRemove(req.params.id, function (err, team, next) { 
        if (err) return next(err);	
        res.status(204).send(team);
    });
});

module.exports = api;