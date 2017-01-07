'use strict';

eventsApp.controller('LoginController',
    function LoginController($scope, Authentication, gravatarUrlBuilder) {
        $scope.user = {};

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.doLogin = function(user) {
            Authentication.login(user);
        };
    }
);