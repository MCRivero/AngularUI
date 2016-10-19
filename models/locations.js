var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatalocationsSchema = new Schema({ 
        name: String,
        locationUrl: String,
        address: String
});

module.exports = mongoose.model('Datalocations', DatalocationsSchema);


