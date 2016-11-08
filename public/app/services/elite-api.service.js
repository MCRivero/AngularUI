
(function () {
    'use strict';

    angular.module('eliteAdmin').factory('eliteApi', eliteApi);

    eliteApi.$inject = ['$http', 'appSpinner', 'authentication'];

    function eliteApi($http, appSpinner, authentication) {
        var service = {
            addLeague: addLeague,
            deleteGame: deleteGame,
            deleteLeague: deleteLeague,
            deleteLocation: deleteLocation,
            deleteTeam: deleteTeam,
            getGames: getGames,
            getLeague: getLeague,
            getLeagues: getLeagues,
            getLocation: getLocation,
            getLocations: getLocations,
            getTeams: getTeams,
            saveGame: saveGame,
            saveLeague: saveLeague,
            saveLocation: saveLocation,
            saveTeam: saveTeam,
			saveAccount: saveAccount,
			login : login
			
        };

        //var baseUrl = 'https://elite-schedule-demo.azure-mobile.net/tables';
		var baseUrl = 'http://localhost:1337';
        var requestConfig = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };

        return service;

		var login = function(user) {
		  return httpPost('/login', user);
		};
		
        function addLeague(league, headers){
            return httpPost('/leagues', league, headers);
        }

        function deleteGame(id, leagueId, headers){
            return httpDelete('/games/' + id + '/' + leagueId, headers);
        }

        function deleteLeague(id, headers){
            return httpDelete('/leagues/' + id, headers);
        }

        function deleteLocation(id){
            return httpDelete('/locations/' + id);
        }

        function deleteTeam(id, leagueId, headers){
            return httpDelete('/teams/' + id + '/' + leagueId, headers);
        }

        function getGames(leagueId){
            //var url = getUrlByLeagueId('/games', leagueId);
            var url = '/games/' + leagueId;
            return httpGet(url);
        }

        function getLeague(leagueId){
            return httpGet('/leagues/' + leagueId);
        }

        function getLeagues() {
            return httpGet('/leagues');
        }

        function getLocation(locationId) {
            return httpGet('/locations/' + locationId);
        }

        function getLocations() {
            return httpGet('/locations');
        }

        function getTeams(leagueId) {
            var url = '/leagues/' + leagueId + '/teams';
            return httpGet(url);
        }

        function saveLeague(league, headers){
            return httpPatch('/leagues/' + league._id, league, headers);
        }

        function saveLocation(location){
            return saveItem('/locations', location);
        }

        function saveGame(game, headers){
            return saveItem('/games', game, headers);
        }

        function saveTeam(team){
            return saveItem('/teams', team);
        }
		
		function saveAccount(user){			
			//console.log(' saveAccount user : ' + JSON.stringify(user));
            return saveItem('/signup', user);
        }

		function login(user){			
			//console.log(' saveAccount user : ' + JSON.stringify(user));
            return saveItem('/login', user);
        }
		
        /** Private Methods **/
        /*
        function getUrlByLeagueId(url, leagueId){
            return url + '?$top=100&$filter=' + encodeURIComponent('leagueId eq \'' + leagueId + '\'');
        }
        */
       
        function getUrlByLeagueId(url, leagueId){
            return url + '?$top=100&$filter=' + encodeURIComponent('leagueId eq \'' + leagueId + '\'');
        }
        
        function httpDelete(url, headers){
			if (headers) {
				requestConfig.headers.Authorization = headers.Authorization;
			};
            return httpExecute(url, 'DELETE');
        }        
        
        /*
        function httpExecute(requestUrl, method, data){
            console.log('Estoy en httpExecute : ', requestUrl, method, data, requestConfig.headers);
            appSpinner.showSpinner();
            return $http({
                url: baseUrl + requestUrl,
                method: method,
                /*transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                        return str.join('&');
                    }
                }, //
                data: data,
                //headers: {'Content-Type': 'text/plain'}
                headers: requestConfig.headers
                //headers: headers
                }).then(function(response){
                    //headers: requestConfig.headers }).then(function(response){
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                appSpinner.hideSpinner();
                console.log('**response from EXECUTE', response);
                return response.data;
            });
        }
        */
        
        function httpExecute(requestUrl, method, data){
            console.log('httpExecute : ' + baseUrl + requestUrl, method, data);
            appSpinner.showSpinner();
            return $http({
                url: baseUrl + requestUrl,
                method: method,
                data: data,
                headers: requestConfig.headers }).then(function(response){
                    appSpinner.hideSpinner();
                    console.log('**response from EXECUTE', response);
                    return response.data;
            });
        }
        
        function httpGet(url){
            return httpExecute(url, 'GET');            
        }

        function httpPatch(url, data, headers){
            requestConfig.headers = {'Content-Type': 'application/json'};
			if (headers) {
				requestConfig.headers.Authorization = headers.Authorization;
			};
            data = angular.toJson(data);
            return httpExecute(url, 'PATCH', data);
        }

        function httpPost(url, data, headers){
            requestConfig.headers = {'Content-Type': 'application/json'};
			if (headers) {
				requestConfig.headers.Authorization = headers.Authorization;
			};
            data = angular.toJson(data);
            return httpExecute(url, 'POST', data);
            
        }

        function saveItem(url, item, headers){
			if (headers) {
				requestConfig.headers.Authorization = headers.Authorization;
			};
            if (item._id) {
				console.log('saveItem patch item : ' + url + ' ' + JSON.stringify(item));
                return httpPatch(url + '/' + item._id, item);
            } else {
                // Para ver en consola un objeto hacemos JSON.stringify(item)
                console.log('saveItem post item url : ' + url + ' item : ' + JSON.stringify(item));
                return httpPost(url, item);
            }
        }
    }
})();
