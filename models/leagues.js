var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataleaguesSchema = new Schema({
    name: String,
    homeScreen: { type: String, default: 'Home Screen'},
    rulesScreen: { type: String, default: 'Rule Screen'}
});

module.exports = mongoose.model('Dataleagues', DataleaguesSchema);