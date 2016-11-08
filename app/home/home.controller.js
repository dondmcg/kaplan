(function () {
    "use strict";

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$timeout', 'channelService', '$filter'];

    /* @ngInject */
    function HomeController($timeout, channelService, $filter) {

        var homeCtrl = this;
        homeCtrl.title = 'Channels';

        init();

        function init() {
            channelService.fetch().then(function(data) {
                homeCtrl.channels = data
                console.log(homeCtrl.channels);
            });
        }
        
        homeCtrl.toLocaleDate = function(e) {
            e.date = e.date.toLocaleDateString();
            return e;
        };


    }

    angular.module('app').filter('groupDate', function($filter)
    {
        return function(input)
        {
            if(input == null){ return ""; }
            var _date = $filter('date')(new Date(input), 'EEE, MMMM d, y');
            return _date;
        };
    });

    angular.module('app').filter('timeOfLecture', function($filter)
    {
        return function(input)
        {
            if(input == null){ return ""; }
            var _start = $filter('date')(new Date(input), 'h:mm a');
            var d = new Date(input);
            d.setHours(d.getHours() + 1);
            var _end = $filter('date')(new Date(d), 'h:mm a ');
            return _start + ' - ' + _end + ' EDT';
        };
    });

    /*angular.module('app').filter('toLocalDate', function($filter)
    {
        return function(e)
        {
            if(e == null){ return ""; }
            e.date = e.date.toLocaleDateString();
            return e;
        };
    });*/

})();