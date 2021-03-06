'use strict';

var app = angular.module('peviApp', [
	'ngRoute',
  'productControllers',
  'productFilters', 'ngSanitize'
  ]);

app.config(['$routeProvider',
  function($routeProvider) {

    // For any unmatched url, redirect to /state1
    $routeProvider.otherwise("/intro");

    $routeProvider.
      when('/intro', {
        templateUrl: 'pages/intro.html',
        controller: 'ExpensesListCtrl'
      }).
      when('/expenses', {
        templateUrl: 'pages/expenses.html',
        controller: 'ExpensesListCtrl'
      }).
      when('/list/details', {
        templateUrl: 'pages/about.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/list/ha', {
        templateUrl: 'pages/ha.html',
        controller: 'ProductDetailCtrl'
      }).
      otherwise({
        redirectTo: '/intro'
      });
  }]);

