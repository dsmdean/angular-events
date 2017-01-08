'use strict';

eventsApp.directive('eventForm', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "/templates/directives/eventForm.html",
        scope: {
            event: "=",
            saveEvent: "&"
        }
    };
});