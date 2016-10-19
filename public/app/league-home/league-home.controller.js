(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueHomeCtrl', LeagueHomeCtrl);

    //LeagueHomeCtrl.$inject = ['$location', '$routeParams', 'initialData'];
    LeagueHomeCtrl.$inject = ['initialData'];

    /* @ngInject */
    //function LeagueHomeCtrl($location, $routeParams, initialData) {
    function LeagueHomeCtrl(initialData) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        //vm.go = go;

        activate();

        ////////////////

        function activate() {
        }

        /*
        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
            console.log('location path league-home controller' + 'leagues/' + $routeParams.id + '/' + path);
        }
        */
    }
})();