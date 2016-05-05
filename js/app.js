'use strict';

var app = angular.module('peviApp', [
	'ngRoute',
  'productControllers',
    'directives',
  'productFilters', 'ngSanitize', 'xeditable'
  ]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    // For any unmatched url, redirect to /state1
    $routeProvider.otherwise("/intro");

    $routeProvider.
      when('/intro', {
        templateUrl: 'pages/intro.html',
        controller: 'IntroCtrl'
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
        controller: 'HaCtrl'
      }).
      when('/contact-me', {
        templateUrl: 'pages/contact.html',
        controller: 'SendMailCtrl'
      }).
      otherwise({
        redirectTo: '/intro'
      });

    // $locationProvider.html5Mode(true);

  }]);

app.factory('peviService', function($rootScope) {
  var sharedService = {};

  sharedService.pageTitle = '';

  sharedService.prepForBroadcast = function(msg) {
    this.pageTitle = msg;
    this.broadcastItem();
  };

  sharedService.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };

  return sharedService;
});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

