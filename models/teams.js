var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatateamsSchema = new Schema({
    name: String,
    coach: String,
    divisionName: String,
    leagueId: String
});

module.exports = mongoose.model('Datateams', DatateamsSchema);
