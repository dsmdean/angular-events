'use strict';

eventsApp.directive('eventDetails', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "/templates/directives/eventDetails.html",
        scope: {
            event: "="
        }
    };
});