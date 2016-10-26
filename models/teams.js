var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatateamspopulateSchema = new Schema({
    name: String,
    coach: String,
    divisionName: String
},{collection: 'datateamspopulate'});

module.exports = mongoose.model('Datateamspopulate', DatateamspopulateSchema);
