'use strict';

eventsApp.controller('UserController',
    function UserController($scope, $location, $route, gravatarUrlBuilder, userData, Authentication, ngDialog) {
        $scope.user = {};

        if (!Authentication.isAuthenticated()) {
            $location.path('/login');
        }

        $scope.user = $route.current.locals.user;

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.updateUser = function(user) {
            userData.updateUser(user)
                .$promise.then(
                    function(response) {
                        ngDialog.openConfirm({
                            template: '<p>You have updated your profile!</p>' +
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

            $location.path('/user');
        }
    }
);