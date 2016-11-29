'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, userData, gravatarUrlBuilder) {
        $scope.user = {};

        $scope.getGravatarUrl = function(email) {
            return gravatarUrlBuilder.buildGravatarUrl(email);
        }

        $scope.saveEvent = function(user, newUserForm) {
            if(newUserForm.$valid) {
                userData.save(user)
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
