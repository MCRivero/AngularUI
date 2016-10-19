(function () {
    'use strict';

    angular.module('eliteAdmin').controller('NotifyModalCtrl', NotifyModalCtrl);

    NotifyModalCtrl.$inject = ['$modalInstance', 'data'];

    /* @ngInject */
    function NotifyModalCtrl($modalInstance, data) {
        /* jshint validthis: true */
        var vm = this;

        vm.ok = ok;
        vm.properties = data;


        function ok(){
            $modalInstance.close();
        }


    }
})();