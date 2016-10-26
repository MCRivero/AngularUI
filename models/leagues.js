var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataleaguespopulateSchema = new Schema({
    name: String,
    homeScreen: { type: String, default: 'Home Screen'},
    rulesScreen: { type: String, default: 'Rule Screen'},
	teams: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Datateamspopulate'} ]
},{collection: 'dataleaguespopulate'});

module.exports = mongoose.model('Dataleaguespopulate', DataleaguespopulateSchema);