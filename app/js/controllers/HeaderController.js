'use strict';

eventsApp.controller('HeaderController',
    function HeaderController($scope, $rootScope, $location, Authentication) {
        $scope.loggedIn = false;
        $scope.admin = false;
        $scope.page = $location.path();

        $scope.activate = function(link) {
            $scope.page = link;
            $location.path(link);
        };

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

            $scope.activate('user');

        });

        $scope.logOut = function() {
            Authentication.logout();
            $scope.loggedIn = false;
            $scope.admin = false;

            $scope.activate('login');
        };
    }
);