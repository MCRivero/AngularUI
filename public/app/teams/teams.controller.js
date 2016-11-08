(function () {
    'use strict';

    angular.module('eliteAdmin').controller('TeamsCtrl', TeamsCtrl);

    TeamsCtrl.$inject = ['$modal', '$state', '$stateParams', 'initialData', 'eliteApi', 'dialogsService', 'authentication'];
    
    /* @ngInject */
    function TeamsCtrl($modal, $state, $stateParams, initialData, eliteApi, dialogs, authentication) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        //vm.go = go;
        vm.teams = initialData;
        vm.toggleExpand = toggleExpand;
        vm.accordionExpanded = true;
		vm.leagueId = $stateParams.leagueId;

        activate();

        ////////////////

        function activate() {
            initializeGroups();
            
        }
      
        function deleteItem(id, leagueId) {
			if (!authentication.isLoggedIn()){		
				dialogs.confirm('To delete a team you should be logged in', 'Warning to the user !!!', ['OK', 'Cancel'])
					.then(function(){
						$state.go('login');			
					});
				return;
			}
			
			var headers = {
				Authorization: 'Bearer ' + authentication.getToken()
			};
			
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteTeam(id, $stateParams.leagueId, headers).then(function(data){
                        _.remove(vm.teams, { '_id': id });
                        initializeGroups();
                    });
                });
        }

        function editItem(team){
            var modalInstance = $modal.open({
                templateUrl: '/app/teams/edit-team.html',
                controller: 'EditTeamCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            divisions: _.chain(vm.teams).uniq('divisionName').map('divisionName').value(),
                            itemToEdit: team
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $stateParams.leagueId;
				var headers = {
					Authorization: 'Bearer ' + authentication.getToken()
				};
                eliteApi.saveTeam(result).then(function(data){
                    if (team){
                        _.assign(team, data);
                    } else{
                        vm.teams.push(data);
                    }
                    initializeGroups();
                });
            });
        }
        
        /*
        function go(path){
            //$location.path('leagues/' + $routeParams.id + '/' + path);
            $state.go('league-games', { id: $stateParams.id });
        } 
        */
		
		function hideAlert(){
            vm.showHelpAlert = false;
        }

        function initializeGroups() {
            vm.groups = _.chain(vm.teams)
                .sortBy('name')
                .groupBy('divisionName')
                .pairs()
                .map(function(item){
                    return { divisionName: item[0], teams: item[1], isOpen: true };
                })
                .sortBy('divisionName')
                .value();
        }

        function toggleExpand(expand){
            _.forEach(vm.groups, function(group){
                group.isOpen = expand;
            });
        }
    }
})();