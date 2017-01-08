'use strict';

eventsApp.directive('userUpdateForm', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "/templates/directives/userUpdateForm.html",
        scope: {
            userU: "=",
            updateUser: "&"
        }
    };
});