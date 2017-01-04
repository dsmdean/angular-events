'use strict';

eventsApp.directive('userProfile', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "/templates/directives/userProfile.html",
        scope: {
            user: "="
        }
    };
});