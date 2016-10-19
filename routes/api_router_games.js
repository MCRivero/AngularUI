var express = require("express");

var Games = require('../models/games');

var api = express.Router();

api.get('/leagues/:id/games', function(req, res){ 
    Games.find({ leagueId: req.params.id }, function(err, games, next) {
        if (err) return next(err);        
        res.json(games);
    });
});

api.get('/games/:id', function(req, res){ 
    Games.find({ leagueId: req.params.id }, function(err, games, next) {
        if (err) return next(err);
        res.json(games);
    });
});

api.post('/games', function(req, res){
    console.log(' req games : ' + JSON.stringify(req.body));
    var game = new Games();
    
    game.locationId = req.body.locationId;
    game.team1Id = req.body.team1Id;
    game.team2Id = req.body.team2Id;
    game.team1Score = "";
    game.team2Score = "";
    game.time = req.body.time;
    game.leagueId = req.body.leagueId;
    game.save(function(err, result, next) {
        if (err) return next(err);
        res.json(result);
    });
});

api.patch('/games/:id', function(req, res){ 
    //console.log('*** patch games req body id : ' + req.body._id + ' name : ' + req.body.name);

    Games.findOne({ _id: req.body._id }, function(err, game, next) {
        if (err) return next(err);
        game.time = req.body.time;
        game.locationId = req.body.locationId;
        game.team1Id = req.body.team1Id;
        game.team2Id = req.body.team2Id;
        game.save(function(err, result, next) {
            if (err) return next(err);
            res.json(result);
        });
    });
});

api.delete('/games/:id', function(req, res){ 
    Games.findByIdAndRemove(req.params.id, function (err, game, next) { 
        if (err) return next(err);
        res.send(game);
    });
});

module.exports = api;