'use strict';

eventsApp.controller('UserController',
    function UserController($scope, $localStorage, $location, gravatarUrlBuilder, userData) {
        $scope.user = {};

        $scope.localstorage = $localStorage.getObject('Token', '{}');

        $scope.user = userData.getUser($scope.localstorage.id);
        $scope.userU = userData.getUser($scope.localstorage.id);

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.updateUser = function(userU) {
            userData.updateUser(userU);

            $location.path('/user');
        }
    }
);