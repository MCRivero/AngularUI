var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var passport = require('passport');
var session = require("express-session");
var favicon = require('serve-favicon');

var apiRouter = require('./routes/api_router');
var apiRouterLeagues = require('./routes/api_router_leagues');
var apiRouterTeams = require('./routes/api_router_teams');
var apiRouterGames = require('./routes/api_router_games');
var apiRouterLocations = require('./routes/api_router_locations');
var apiRouterUser = require('./routes/api_router_user');

var setUpPassport = require('./setuppassport');

var app = express();

//
// El puerto 27017 se abre cuando se arranca mongod
//
mongoose.connect('mongodb://localhost:27017/AngularUI');

mongoose.connection.once('open', function(){
    console.log('We are connected to AngularUI');
});

setUpPassport();

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
	secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());

//app.use(passport.session);

app.use(morgan('short'));

// Busca la aplicacion en este directorio
app.use(express.static(path.join(__dirname, 'public')));

// Usa las rutas definidas en apiRouter ( en /routes/api_routes.js )
app.use('/', apiRouter);

// Separo las rutas que pertenecen a Leagues ( en /routes/api_router_leagues.js )
app.use('/', apiRouterLeagues);

// Separo las rutas que pertenecen a Teams ( en /routes/api_router_teams.js )
app.use('/', apiRouterTeams);

// Separo las rutas que pertenecen a Games ( en /routes/api_router_games.js )
app.use('/', apiRouterGames);

// Separo la ruta que pertenece a Locations ( en /routes/api_router_locations.js )
app.use('/', apiRouterLocations);

// Separo la ruta que pertenece a User ( en /routes/api_router_user.js )
app.use('/', apiRouterUser);

app.listen(1337, function(err){
	if (err) throw err;
	console.log('Server running on port 1337');
});