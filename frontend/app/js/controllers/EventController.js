'use strict';

eventsApp.controller('EventController',
    function EventController($scope, $route, eventData, Authentication, ngDialog) {

        $scope.sortorder = 'name';
        $scope.event = $route.current.locals.event;
        $scope.voteBody = {};

        $scope.validateLogin = function(session, vote) {
            if (Authentication.isAuthenticated()) {
                $scope.voteBody.vote = vote;
                $scope.voteBody.userId = Authentication.getUserId();
                eventData.voteSession(
                        $scope.event, session, $scope.voteBody
                    )
                    .$promise.then(
                        function(response) {
                            if (response.status === "success") {
                                session.upVoteCount += vote;
                                console.log("Vote succesfull!");
                            } else {
                                console.log("Already voted!");
                            }
                        },
                        function(response) {
                            console.log("Error voting!");
                        }
                    );
            } else {
                ngDialog.openConfirm({
                    template: '<p>You have to login if you want to vote!</p>' +
                        '<div>' +
                        '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">Ok </button>' +
                        '</div>',
                    plain: true,
                    className: 'ngdialog-theme-default'
                }).then(function(value) {
                    //Do something 
                }, function(value) {
                    //Do something 
                });
            }
        };

        $scope.upVoteSession = function(session) {
            $scope.validateLogin(session, 1);
            //session.upVoteCount++;
        };

        $scope.downVoteSession = function(session) {
            if (session.upVoteCount > 0) {
                $scope.validateLogin(session, -1);
                //session.upVoteCount--;
            }
        };
    }
);