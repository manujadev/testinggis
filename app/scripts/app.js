'use strict';
//var browser = require('bowser').browser;
/**
 * @ngdoc overview
 * @name myproj01App
 * @description
 * # myproj01App
 *
 * Main module of the application.
 */
angular
    .module('myproj01App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/cartonamed', {
                templateUrl: 'views/cartonamed.html',
                controller: 'CartoNamedMapsController',
                controllerAs: 'cartonamed'
            })            
            .otherwise({
                redirectTo: '/'
            });
    });