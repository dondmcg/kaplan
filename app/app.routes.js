angular.module('app')
    .config(['$routeProvider',function ($routeProvider) {
        "use strict";

        $routeProvider

        .when('/home',{
            templateUrl: '/home/home.html',
            controller: 'HomeController',
            controllerAs: "homeCtrl"
        })
        .when('/checkout',{
            templateUrl: '/checkout/checkout.html',
            controller: 'CheckoutController',
            controllerAs: "checkoutCtrl"
        })

        .when('/heroes',{
            templateUrl: '/heroes/hero-list.html',
            controller: 'HeroListController',
            controllerAs: "heroListCtrl"
        })
        .when('/users',{
            templateUrl: '/users/users.html',
            controller: 'UserController',
            controllerAs: "userCtrl"
        })

        .otherwise({
            redirectTo:'/home'
        });
    }])
