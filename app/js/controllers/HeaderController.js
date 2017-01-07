'use strict';

eventsApp.controller('HeaderController',
    function HeaderController($scope, $rootScope, $location, Authentication) {
        $scope.loggedIn = false;
        $scope.admin = false;
        $scope.page = $location.path();

        $scope.getClass = function(path) {
            return ($location.path().substr(0, path.length) === path || $location.path().substr(0, 16) === path) ? 'active' : '';
        }

        if (Authentication.isAuthenticated()) {
            $scope.loggedIn = true;

            if (Authentication.isAdmin()) {
                $scope.admin = true;
            }
        }

        $rootScope.$on('login:Successful', function() {
            $scope.loggedIn = true;

            if (Authentication.isAdmin()) {
                $scope.admin = true;
            }

            $location.path("user");

        });

        $scope.logOut = function() {
            Authentication.logout();
            $scope.loggedIn = false;
            $scope.admin = false;

            $location.path("login");
        };
    }
);