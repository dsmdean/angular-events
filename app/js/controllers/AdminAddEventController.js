'use strict';

eventsApp.controller('AdminAddEventController',
    function AdminAddEventController($scope, $location, eventData) {
        $scope.event = {};
        $scope.defaultImg = "http://www.freelancedesignerindia.com/wp-content/uploads/2015/02/angular-js-swap-ng-src-attributes-img-tag-660x330.jpg";

        $scope.saveEvent = function(event) {
            eventData.save(event)
                .$promise
                .then(
                    function(response) {
                        console.log('success');
                        ngDialog.openConfirm({
                            template: '<p>You have added a new event: <strong>' + response.name + '</strong></p>' +
                                '<div>' +
                                '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Ok </button>' +
                                '</div>',
                            plain: true,
                            className: 'ngdialog-theme-default'
                        }).then(function(value) {
                            //Do something
                        }, function(value) {
                            $location.path("/admin/eventlist");
                        });
                    }
                )
                .catch(
                    function(response) {
                        console.log('failiure', response);
                    }
                );
        };
    }
);