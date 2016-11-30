'use strict';

eventsApp.controller('ProfileListController',
    function ProfileListController($scope, $route, eventData) {
        
        $scope.users = $route.current.locals.users;
    }
);