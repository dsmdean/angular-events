'use strict';

eventsApp.controller('AdminEventController',
    function AdminEventController($scope, $route, $location, eventData, ngDialog) {

        $scope.sortorder = 'name';
        $scope.events = $route.current.locals.events;

        $scope.editEvent = function(eventId) {
            $location.path('/admin/editEvent/' + eventId);
        };

        $scope.deleteEvent = function(eventId) {
            ngDialog.openConfirm({
                template: '<p>Are you sure you want to delete this event?</p>' +
                    '<div>' +
                    '<button type="button" class="btn btn-danger" ng-click="confirm(1)">Delete </button>&nbsp;' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Cancel </button>' +
                    '</div>',
                plain: true,
                className: 'ngdialog-theme-default'
            }).then(function(value) {
                eventData.deleteEvent(eventId);
                $location.path('/admin/eventlist');
            }, function(value) {
                //Do something 
            });
        };
    }
);