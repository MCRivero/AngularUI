var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatagamespopulateSchema = new Schema({
	locationId: String, 
	team1Id: String,
	team2Id: String,
	team1Score: String,
	team2Score: String,
	time: String
},{collection: 'datagamespopulate'});

module.exports = mongoose.model('Datagamespopulate', DatagamespopulateSchema);