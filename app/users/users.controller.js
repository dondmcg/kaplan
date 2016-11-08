(function () {
    "use strict";

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$http','$window','$log', 'UserService'];

    /* @ngInject */
    function UserController($http, $window, $log, UserService) {
        /* jshint validthis: true */
        var userCtrl = this;


        userCtrl.title = 'User Controller';
        userCtrl.editedUser = null;
        userCtrl.adding = false;
        userCtrl.newUser = null;

        activate();

        function activate() {
            UserService.query().$promise
            .then(function(data){
                userCtrl.users = data;
            }).catch( function(response){
                $log.error(response.status);
            });
        };

        userCtrl.editing = function(user) {
            userCtrl.originalUser = angular.extend({},user);
            userCtrl.editedUser = user;
        };

        userCtrl.revertEditing = function(index) {
            userCtrl.editedUser = {};
            userCtrl.users[index] = userCtrl.originalUser;
        };

        userCtrl.save = function(form) {
            if(form.$invalid){
                $window.alert("can't save: form is not valid");
                return false;
            }
            UserService.update(userCtrl.editedUser.id, userCtrl.editedUser).$promise
            .then(function(data){
                userCtrl.editedUser = {};
            }).catch(function(response){
                $window.alert('problem saving');
                $log.error(response.status);
            })
        };

        userCtrl.remove = function($index, userid) {
            UserService.remove(users.id)
                .then(function (response) {
                    userCtrl.users.splice(index,1);
                }).catch(function (response) {
                $window.alert('problem deleting');
                $log.error(response.status);
            })
        };

        userCtrl.addnew = function() {
            userCtrl.adding = true;
        }

        userCtrl.addcancel = function() {
            userCtrl.adding = false;
            console.log(userCtrl.adding);
        }

        userCtrl.add = function(form) {
            if(form.$invalid){
                $window.alert("can't add: form is not valid");
                return false;
            }
            var newuser = {name: 'Todd',email: 'a@a.com'};
            UserService.add(newuser)
                .then(function(response){
                    console.log(response);
                    //userCtrl.user = response;
                    userCtrl.adding = false;
                }).catch(function(response){
                $window.alert('problem adding');
                $log.error(response.status);
            })
        };

    }


})();