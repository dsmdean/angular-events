'use strict';

eventsApp.controller('AdminEditEventController',
    function AdminEditEventController($scope, $location, $route, eventData, ngDialog) {
        $scope.event = $route.current.locals.event;

        $scope.updateSession = function(eventId, session) {
            eventData.updateSession(eventId, session)
                .$promise.then(
                    function(response) {
                        ngDialog.openConfirm({
                            template: '<p>You have updated the session: <strong>' + response.name + '</strong></p>' +
                                '<div>' +
                                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Ok </button>' +
                                '</div>',
                            plain: true,
                            className: 'ngdialog-theme-default'
                        }).then(function(value) {
                            //Do something
                        }, function(value) {
                            //Do something 
                        });
                    },
                    function(response) {
                        console.log("Error!");
                    }
                );
        };

        $scope.updateEvent = function(event) {
            eventData.updateEvent(event)
                .$promise.then(
                    function(response) {
                        ngDialog.openConfirm({
                            template: '<p>You have updated the event: <strong>' + response.name + '</strong></p>' +
                                '<div>' +
                                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Ok </button>' +
                                '</div>',
                            plain: true,
                            className: 'ngdialog-theme-default'
                        }).then(function(value) {
                            //Do something
                        }, function(value) {
                            //Do something 
                        });
                    },
                    function(response) {
                        console.log("Error!");
                    }
                );
        }
    }
);