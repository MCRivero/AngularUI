(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeaguesCtrl', LeaguesCtrl);

    LeaguesCtrl.$inject = ['dialogsService', 'initialData', 'eliteApi', '$rootScope', 'authentication', '$state'];

    /* @ngInject */
    function LeaguesCtrl(dialogs, initialData, eliteApi, $rootScope, authentication, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.leagues = initialData;
		vm.addItem = addItem;
        vm.cancelEdit = cancelEdit;
        vm.currentEdit = {};
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;   
		vm.hideAlert = hideAlert;
        vm.itemToEdit = {};
        vm.saveItem = saveItem;
        vm.showHelpAlert = true;
		vm.configure = configure;
		vm.alert = 'First create your league. Then "Configure" your league by creating teams and games.'

        activate();

        ////////////////        

        function activate() {
        }
		
		function addItem(){
			
			if (!authentication.isLoggedIn()){
				vm.alert = 'To add a league you need to be logged in';
				return;
			}
			
            var newLeague = {
                name: vm.newLeagueName
            };
			
			var headers = {
				Authorization: 'Bearer ' + authentication.getToken()
			};

            eliteApi.addLeague(newLeague, headers).then(function(data){
                vm.newLeagueName = '';
                console.log('Pushing new item to array:', data);
                vm.leagues.push(data);                 
            });
            
        }

        function cancelEdit(id){
            vm.currentEdit[id] = false;
        }

        
        function deleteItem(id){
			
			if (!authentication.isLoggedIn()){
				vm.alert = 'To delete a league you need to be logged in';
				return;
			}
			
			var headers = {
				Authorization: 'Bearer ' + authentication.getToken()
			};
			
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
               .then(function(){	
                    eliteApi.deleteLeague(id, headers).then(function(data){ 
                        _.remove(vm.leagues, { '_id': id });
                    });
            });
        }
        
       
        /*
        function deleteItem(id){
            var modalInstance = $modal.open({
                templateUrl: '/app/shared/confirm-modal.html',
                controller: 'ConfirmModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function(){
                        return {
                          title: 'Delete?',
                          message: 'Are you sure you want to Delete?',
                          buttons: ['OK', 'Cancel']
                        }
                    }  
                    
                },
                size: 'sm'
            });   
            modalInstance.result.then(function(){
                eliteApi.deleteLeague(id).then(function(data){
                    // *** No funciona _.remove
                    //_.remove(vm.leagues, { 'id': data._id});
                    for (var i = 0; i < vm.leagues.length; i++) {
                        if (vm.leagues[i]._id === data._id) {
                            vm.leagues.splice(i, 1);
                        }                        
                    }                
                });  
            }, function(){
                console.log('Modal dismissed');
            });
        }
        */
       
        function editItem(item){
            vm.currentEdit[item._id] = true;
            vm.itemToEdit = angular.copy(item);
        }

        function hideAlert(){
            vm.showHelpAlert = false;
        }
		
        function saveItem(item){
				if (!authentication.isLoggedIn()){
					vm.alert = 'To edit a league you need to be logged in';
					return;
				}

				var headers = {
					Authorization: 'Bearer ' + authentication.getToken()
				};
			
                eliteApi.saveLeague(vm.itemToEdit, headers).then(function(data){
                vm.currentEdit[item._id] = false;
                item.name = vm.itemToEdit.name;
            });
        }	
		
		function configure(item){
		
			if (!authentication.isLoggedIn()){
				vm.alert = 'To configure a league you need to be logged in';
				return;
			}
			
			$state.go('league.teams', { leagueId: item });
			
		}

   }
})();