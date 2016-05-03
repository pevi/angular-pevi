'use strict';

var app = angular.module('peviApp', [
	'ngRoute',
  'productControllers',
    'directives',
  'productFilters', 'ngSanitize', 'xeditable'
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
    when('/categories', {
      templateUrl: 'pages/categories.html',
      controller: 'CategoriesListCtrl'
    }).
      when('/details', {
        templateUrl: 'pages/about.html',
        controller: 'AboutCtrl'
      }).
      when('/ha', {
        templateUrl: 'pages/ha.html',
        controller: 'ProductDetailCtrl'
      }).
      when('/contact-me', {
        templateUrl: 'pages/contact.html',
        controller: 'SendMailCtrl'
      }).
      otherwise({
        redirectTo: '/intro'
      });
  }]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

