'use strict';

eventsApp.controller('LoginController',
    function LoginController($scope, Authentication, gravatarUrlBuilder) {
        $scope.user = {};

        if (Authentication.isAuthenticated()) {
            $location.path('/user');
        }

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.doLogin = function(user) {
            Authentication.login(user);
        };
    }
);