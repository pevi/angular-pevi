'use strict';

var directives = angular.module('directives', ['ui.bootstrap']);
directives.directive('tooltipLoader', function() {
    return function(scope, element, attrs) {

        element.tooltip({
            effect: 'slide',
            trigger:"hover",
            placement: "top",
            delay: {show: 100, hide: 0}
        });

    };
});