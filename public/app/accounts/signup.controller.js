(function () {
    'use strict';

    angular.module('eliteAdmin').controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['eliteApi', 'authentication', '$state'];

    /* @ngInject */
    function SignupCtrl(eliteApi, authentication, $state) {
        /* jshint validthis: true */
		
        var vm = this;
        vm.activate = activate;
		vm.addAccount = addAccount;
		vm.showInfoAlert = false;
		vm.hideAlert = hideAlert;
		
        activate();

        ////////////////

        function activate() {
			
        }
		
		function addAccount(){
            var newAccount = {
                username: vm.username,
				password: vm.password
            };
            eliteApi.saveAccount(newAccount).then(function(data){
				if (data.code == 11000){
					vm.error = "Cuenta de usuario duplicado";
					vm.showInfoAlert = true;
				} else if (data.errors && data.errors.username){
					vm.error = data.errors.username.message;
					vm.showInfoAlert = true;
				} else if (data.errors && data.errors.password){
					vm.error = data.errors.password.message;
					vm.showInfoAlert = true; 
				} else {
					console.log('Token : ' + JSON.stringify(data)),
					authentication.saveToken(data.token);
					vm.username = '';
					vm.password = ''; 
					vm.showInfoAlert = false;
					$state.go('leagues');
				}
            });
        }
		
		function hideAlert(){
            vm.showInfoAlert = false;
			vm.username = '';
			vm.password = ''; 
        }
		
	}
})();