'use strict';

eventsApp.controller('HeaderController',
    function HeaderController($scope, $rootScope, $localStorage, $location, $state, Authentication) {
        $scope.loggedIn = false;
        $scope.admin = false;

        if (Authentication.isAuthenticated()) {
            $scope.loggedIn = true;

            $scope.localstorage = $localStorage.getObject('Token', '{}');

            if ('admin' in $scope.localstorage) {
                $scope.admin = true;
            }

            $location.path('/user');
        }

        $rootScope.$on('login:Successful', function() {
            $scope.loggedIn = true;

            $scope.localstorage = $localStorage.getObject('Token', '{}');

            if ('admin' in $scope.localstorage) {
                $scope.admin = true;
            }

            $location.path('/user');

        });

        $scope.logOut = function() {
            Authentication.logout();
            $scope.loggedIn = false;
            $scope.admin = false;

            //$location.path('/events');
            $state.go('app', {}, { reload: true });
        };
    }
);