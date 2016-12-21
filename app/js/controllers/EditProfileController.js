'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, userRegistration, gravatarUrlBuilder) {
        $scope.user = {};

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.saveUser = function(user, newUserForm) {
            if (newUserForm.$valid) {
                userRegistration.save(user)
                    .$promise
                    .then(
                        function(response) {
                            console.log('success', response);
                        }

                    )
                    .catch(
                        function(response) {
                            console.log('failiure', response);
                        }
                    );
            }
        };
    }
);