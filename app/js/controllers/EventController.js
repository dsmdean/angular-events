'use strict';

eventsApp.controller('EventController',
    function EventController($scope, $routeParams, $route, $localStorage, $location, eventData, Authentication) {

        $scope.sortorder = 'name';
        $scope.event = $route.current.locals.event;

        $scope.validateLogin = function(session, vote) {
            if (Authentication.isAuthenticated()) {
                session.upVoteCount += vote;
            } else {
                $location.path("/login");
            }
        };

        $scope.upVoteSession = function(session) {
            $scope.validateLogin(session, 1);
            //session.upVoteCount++;
        };

        $scope.downVoteSession = function(session) {
            if (session.upVoteCount > 0) {
                $scope.validateLogin(session, -1);
                //session.upVoteCount--;
            }
        };
    }
);