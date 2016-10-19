var express = require("express");

var Locations = require('../models/locations');

var api = express.Router();

api.get('/locations', function(req, res){ 
    Locations.find({}, function(err, locations, next) {
        if (err) return next(err);
        res.json(locations);
    });
});

module.exports = api;