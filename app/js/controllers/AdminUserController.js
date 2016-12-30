'use strict';

eventsApp.controller('AdminUserController',
    function AdminUserController($scope, $location, userData, Authentication) {
        $scope.users = {};
        $scope.users = userData.getAllUsers();

        if (!Authentication.isAuthenticated()) {
            $location.path('/login');
        }

        $scope.updateUser = function(userU) {
            userData.updateUser(userU);

            $location.path('/user');
        }
    }
);