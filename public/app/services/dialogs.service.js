(function () {
    'use strict';

    angular.module('eliteAdmin').factory('dialogsService', dialogsService);

    dialogsService.$inject = ['$modal'];

     function dialogsService($modal) {
        var service = {
            confirm: confirm,
			notify: notify
        };

        return service;

        function confirm(message, title, buttons){
            var modalInstance = $modal.open({
                templateUrl: '/app/shared/confirm-modal.html',
                controller: 'ConfirmModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            message: message,
                            title: title,
                            buttons: buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
		 
		 function notify(message, title, buttons){
            var modalInstance = $modal.open({
                templateUrl: '/app/shared/notify-modal.html',
                controller: 'NotifyModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            message: message,
                            title: title,
                            buttons: buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
    }
})();