(function(){
    "use strict";

    angular
        .module('app')
        .factory('channelService', channelService);

    channelService.$inject = ['$q', '$timeout', '$http'];

    function channelService($q, $timeout, $http) {
        var channelList = {
            fetch: function() {
                return $timeout(function(){
                    return $http.get('channel.json').then(function(response) {
                        return response.data;
                    })
                }, 30)
            }
        };

        return channelList;
    }

})();