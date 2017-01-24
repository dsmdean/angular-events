'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $route) {

        $scope.sortorder = 'name';
        $scope.events = $route.current.locals.events;
    }
);