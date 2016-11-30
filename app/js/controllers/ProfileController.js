'use strict';

eventsApp.controller('ProfileController',
    function ProfileController($scope, $route, gravatarUrlBuilder) {
        
        $scope.user = $route.current.locals.user;

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }
    }
);