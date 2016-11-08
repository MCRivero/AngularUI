(function () {
    'use strict';
    var app = angular.module('eliteAdmin', [
        // Angular modules
        //'ngRoute',

        // 3rd Party Modules
        'ui.bootstrap',
        'ui.router',
		'ui.calendar',
		'uiGmapgoogle-maps'
    ]);
	
    //app.config(['$routeProvider', configRoutes]); 
    
    app.config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', configRoutes]); 

    function configRoutes($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
		
		uiGmapGoogleMapApiProvider.configure({
			// key: 'your api key'
			v: '3.17'
			//libraries: 'weather, geometry, visualization'
		});
		
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                    data: {
                            property1: 'foo',
                            property2: 'bar'
                    }
            })
			.state('login', {
                url: '/login',
                templateUrl: 'app/accounts/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
			.state('signup', {
                url: '/signup',
                templateUrl: 'app/accounts/signup.html',
			
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            })
			.state('locations', {
                url: '/locations',
                templateUrl: 'app/locations/locations.html',
                controller: 'LocationsCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['eliteApi', function (eliteApi) {
                        return eliteApi.getLocations();
                    }]
                }
            })
			.state('location', {
				url: '/location/:id',
				templateUrl: 'app/locations/edit-location.html',
				controller: 'EditLocationCtrl',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
						return ($stateParams.id ? eliteApi.getLocation($stateParams.id) : {});
					}],
					maps: ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi){
						return uiGmapGoogleMapApi;
					}],
					currentPosition: ['$q', function($q){
						var deferred = $q.defer();
						navigator.geolocation.getCurrentPosition(function(position){
							deferred.resolve(position);
						});
						return deferred.promise;
					}]
				}
			})
            .state('leagues', {
                url: '/leagues',
                templateUrl: 'app/leagues/leagues.html',
                controller: 'LeaguesCtrl',
                controllerAs: 'vm',
                resolve: {
                    initialData: ['eliteApi', function (eliteApi) {
                        return eliteApi.getLeagues();
                    }]
                }
            })
            .state('league', {
                url: '/leagues/:leagueId',
                abstract: true,
                controller: 'LeagueShellCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/layout/league-shell.html'
            })
            /* Multiples vistas con nombre
            .state('league.teams', {
				url: '/teams',
                views: {
                    'tabContent': {
                        templateUrl: 'app/teams/teams.html',
                        controller: 'TeamsCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getTeams($stateParams.leagueId);
                            }]
                        }
                    },
                    'view1': {
                        template: '<div>This is View 1</div>'
                    },
                    'view2': {
                        template: '<div>This is View 2</div>'
                    },
                    'view3': {
                        template: '<div>This is View 3</div>'
                    }
                }
            })
            */
            .state('league.teams', {
				url: '/teams',
                views: {
                    'tabContent': {
                        templateUrl: 'app/teams/teams.html',
                        controller: 'TeamsCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getTeams($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('league.games', {
				url: '/games',
                views: {
                    'tabContent': {
                        templateUrl: 'app/games/games.html',
                        controller: 'GamesCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'gamesInitialDataService', function ($stateParams, gamesInitialDataService) {
                                return gamesInitialDataService.getData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('league.games-calendar', {
				url: '/games-calendar',
                views: {
                    'tabContent': {
                        templateUrl: 'app/games/games-calendar.html',
                        controller: 'GamesCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'gamesInitialDataService', function ($stateParams, gamesInitialDataService) {
                                return gamesInitialDataService.getData($stateParams.leagueId);
                            }]
                        }
                    }
                }
            })
            .state('league.home', {
				url: '/league-home',
                views: {
                    'tabContent': {
                        templateUrl: 'app/league-home/league-home.html',
                        controller: 'LeagueHomeCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            initialData: ['$stateParams', 'eliteApi', function ($stateParams, eliteApi) {
                                return eliteApi.getLeague($stateParams.leagueId);
                            }]
                        }
                    }
                }
            });
			
        $urlRouterProvider.otherwise('/');
    }

    app.run(['$state', 'stateWatcherService', function ($state, $stateWatcherService) {
        // Include $route to kick start the router.
    }]);
})();