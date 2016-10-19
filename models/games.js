var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatagamesSchema = new Schema({
	locationId: String, 
	team1Id: String,
	team2Id: String,
	team1Score: String,
	team2Score: String,
	time: String,
	leagueId: String
});

module.exports = mongoose.model('Datagames', DatagamesSchema);
