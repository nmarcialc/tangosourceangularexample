angular.module('app',['ngResource','ngRoute','chart.js']);

angular.module('app').config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/',{templateUrl:'/partials/main',controller: 'mvMainCtrl'});

});

