'use strict';

/* Filters */

angular.module('productFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

angular.module('productFilters', []).filter('currentdate',['$filter',  function($filter) {
  return function() {
    return $filter('date')(new Date(), 'yyyy');
  };
}])

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});