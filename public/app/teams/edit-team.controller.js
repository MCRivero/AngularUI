(function () {
    'use strict';

    angular.module('eliteAdmin').controller('EditTeamCtrl', EditTeamCtrl);

    EditTeamCtrl.$inject = ['$modalInstance', 'data', 'authentication'];

    /* @ngInject */
    function EditTeamCtrl($modalInstance, data, authentication) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.cancel = cancel;
        vm.editableItem = angular.copy(data.itemToEdit);
        vm.properties = data;
        vm.save = save;
        vm.title = (data.itemToEdit ? 'Edit Team' : 'Add New Team');
		vm.hideAlert = hideAlert;
        vm.showHelpAlert = false;


        activate();

        ////////////////

        function activate() {
        }

        function cancel(){
            $modalInstance.dismiss();
        }

        function save(){
			if (!authentication.isLoggedIn()){
				vm.showHelpAlert = true;		
				vm.alert = (data.itemToEdit ? 'To edit a team you need to be logged in' : 'To add a new team you need to be logged in');
				return;
			}
			
            $modalInstance.close(vm.editableItem);
        }
		
		function hideAlert(){
            vm.showHelpAlert = false;
        }
    }
})();
