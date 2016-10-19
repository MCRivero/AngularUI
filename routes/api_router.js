var express = require("express");

var api = express.Router();

api.get('/', function(req, res){
    res.status(200).sendFile(path.join(__dirname , 'public/index.html' ));
});

module.exports = api;