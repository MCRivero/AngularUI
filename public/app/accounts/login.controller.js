(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['eliteApi', 'authentication', '$state'];

    /* @ngInject */
    function LoginCtrl(eliteApi, authentication, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
		vm.doLogin = doLogin;
		vm.showInfoAlert = false;
		vm.hideAlert = hideAlert;
		
		
        activate();

        ////////////////

        function activate() {
        }
		
		function doLogin() {
			var user = {
                username: vm.username,
				password: vm.password
            };
			
			 eliteApi.login(user).then(function(data){
				if (data.errors){
					vm.error = 'Error en login';
					vm.showInfoAlert = true;
				} else {
					authentication.saveToken(data.token);
					vm.username = '';
					vm.password = ''; 
					vm.showInfoAlert = false;
					//$state.go('leagues');
					window.history.back();
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