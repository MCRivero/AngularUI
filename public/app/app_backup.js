(function () {
    'use strict';
    var app = angular.module('eliteAdmin', [
        // Angular modules
        'ngRoute',

        // 3rd Party Modules
		'ui.bootstrap'
    ]);
	
    app.config(['$routeProvider', configRoutes]);    

    function configRoutes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
            .when('/leagues', {
                templateUrl: 'app/leagues/leagues.html',
                controller: 'LeaguesCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['eliteApi', function (eliteApi) {
                        return eliteApi.getLeagues();
                    }]
                }
            })
            .when('/leagues/:id/teams', {
                templateUrl: 'app/teams/teams.html',
                controller: 'TeamsCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$route', 'eliteApi', function ($route, eliteApi) {
                        return eliteApi.getTeams($route.current.params.id);
                    }]
                }
            })
            .when('/leagues/:id/games', {
                templateUrl: 'app/games/games.html',
                controller: 'GamesCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$route', 'gamesInitialDataService', function ($route, gamesInitialDataService) {
                        return gamesInitialDataService.getData($route.current.params.id);
                    }]
                }
            })
            .when('/leagues/:id/league-home', {
                templateUrl: 'app/league-home/league-home.html',
                controller: 'LeagueHomeCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['$route', 'eliteApi', function ($route, eliteApi) {
                        return eliteApi.getLeague($route.current.params.id);
                    }]
                }
            });


        $routeProvider.otherwise('/');
    }

    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();