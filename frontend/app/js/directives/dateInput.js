'use strict';

eventsApp.directive('dateInput', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "/templates/directives/dateInput.html",
        scope: {
            inputId: "=",
            model: "="
        }
    };
});