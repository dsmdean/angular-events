'use strict';

eventsApp.controller('AdminUserController',
    function AdminUserController($scope, $location, $route, userData, Authentication, ngDialog) {
        $scope.users = {};

        //$scope.users = userData.getAllUsers();
        $scope.users = $route.current.locals.users;

        if (!Authentication.isAuthenticated()) {
            $location.path('/login');
        }

        $scope.deleteUser = function(userId) {
            ngDialog.openConfirm({
                template: '<p>Are you sure you want to delete this user?</p>' +
                    '<div>' +
                    '<button type="button" class="btn btn-danger" ng-click="confirm(1)">Delete </button>&nbsp;' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Cancel </button>' +
                    '</div>',
                plain: true,
                className: 'ngdialog-theme-default'
            }).then(function(value) {
                userData.deleteUser(userId);
                $location.path('/admin/userlist');
            }, function(value) {
                //Do something 
            });
        };
    }
);