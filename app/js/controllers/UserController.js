'use strict';

eventsApp.controller('UserController',
    function UserController($scope, $localStorage, $location, $route, gravatarUrlBuilder, userData, Authentication) {
        $scope.user = {};

        if (!Authentication.isAuthenticated()) {
            $location.path('/login');
        }

        $scope.localstorage = $localStorage.getObject('Token', '{}');

        $scope.user = $route.current.locals.user;
        //$scope.user = userData.getUser($scope.localstorage.id);
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