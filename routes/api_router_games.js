var express = require("express");

var Games = require('../models/games');
var Leagues = require('../models/leagues');

var async = require('async') ;

var api = express.Router();

api.get('/leagues/:id/games', function(req, res){ 
    Leagues.findById( req.params.id )
			.populate('games')
			.exec(function(err, league, next) {
        		if (err) return next(err);
        		res.json(league.games);
    		});
});

/*** antes de populate ***
api.get('/games/:id', function(req, res){ 
    Games.find({ leagueId: req.params.id }, function(err, games, next) {
        if (err) return next(err);
        res.json(games);
    });
});
*/

api.get('/games/:id', function(req, res){
    Leagues.findById( req.params.id )
		.populate('games')
		.exec(function(err, league, next) {	
        	if (err) return next(err);
        	res.json(league.games);
    	});
});

/*** antes de async ***
api.post('/games', function(req, res){
    console.log(' req games : ' + JSON.stringify(req.body));
    var game = new Games();
    
    game.locationId = req.body.locationId;
    game.team1Id = req.body.team1Id;
    game.team2Id = req.body.team2Id;
    game.team1Score = "";
    game.team2Score = "";
    game.time = req.body.time;
    //game.leagueId = req.body.leagueId;
    game.save(function(err, result, next) {
        if (err) return next(err);
        res.json(result);
    });
});
*/ 

api.post('/games', function(req, res){
	
	console.log('Entrando en games POST');
	
	function saveGames(cb) {
		
		var game = new Games();
		game.locationId = req.body.locationId;
		game.team1Id = req.body.team1Id;
		game.team2Id = req.body.team2Id;
		game.team1Score = "";
		game.team2Score = "";
		game.time = req.body.time;
		game.save(function(err, result, next) {
			if (err) return next(err);
			console.log(' *** Save games POST ***');
			//res.json(result);
			cb(null, game);
		});

	}
	
	function updateLeagues(game, cb) {
		console.log('req.body.leagueId en updateLeagues : ' + req.body.leagueId);
		Leagues.findOne({ _id: req.body.leagueId }, function(err, league) {
			if(err) { console.log('ERROR : ' + err); }
			console.log(' League : ' + JSON.stringify(league));			
			league.games.push(game._id);
			league.save(function(err, league){
				if (err) console.log(err);
    		});
			console.log(' League : ' + JSON.stringify(league));
			cb(null, game);
		});
	}

	
	function finalCallback(err, game) {
		if (err) { return console.error(err); }
		return res.json(game);
	}
	
	var steps = [saveGames, updateLeagues];

	async.waterfall(steps, finalCallback);
	
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


/*** antes de async
api.delete('/games/:id', function(req, res){ 
    Games.findByIdAndRemove(req.params.id, function (err, game, next) { 
        if (err) return next(err);
        res.send(game);
    });
});
*/

api.delete('/games/:id/:leagueId', function(req, res){
	
	function deleteGame(cb) {
		Games.findByIdAndRemove(req.params.id, function (err, game) { 
			if (err) { console.log('ERROR REMOVE GAMES : ' + err); }
			cb(null, game);
		});
	}
	
	function updateLeagues(game, cb) {
		
		Leagues.findOne({ _id: req.params.leagueId }, function(err, league) {
			if(err) { console.log('ERROR : ' + err); }
			league.games.remove(req.params.id);
			league.save(function(err, league){
				if (err) console.log(err);
    		});
			cb(null, game);
		});
	}

	function finalCallback(err, game) {
		if (err) { return console.error(err); }
		return res.json(game);
	}
	
	var steps = [deleteGame, updateLeagues];

	async.waterfall(steps, finalCallback);
	
});

module.exports = api;