'use strict';

eventsApp.controller('HeaderController',
    function HeaderController($scope, $rootScope, $localStorage, $location, Authentication) {
        $scope.loggedIn = false;
        $scope.admin = false;
        $scope.page = $location.path();

        $scope.activate = function(link) {
            $scope.page = link;
            $location.path(link);
        };

        if (Authentication.isAuthenticated()) {
            $scope.loggedIn = true;

            $scope.localstorage = $localStorage.getObject('Token', '{}');

            if ('admin' in $scope.localstorage) {
                $scope.admin = true;
            }
        }

        $rootScope.$on('login:Successful', function() {
            $scope.loggedIn = true;

            $scope.localstorage = $localStorage.getObject('Token', '{}');

            if ('admin' in $scope.localstorage) {
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