'use strict';

eventsApp.controller('RegisterController',
    function RegisterController($scope, Authentication, gravatarUrlBuilder) {
        $scope.user = {};

        if (Authentication.isAuthenticated()) {
            $location.path('/user');
        }

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.register = function(user, newUserForm) {
            if (newUserForm.$valid) {
                Authentication.register(user);
            }
        };
    }
);