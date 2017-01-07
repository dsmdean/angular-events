'use strict';

eventsApp.directive('collapsEditSession', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><a aria-hidden="true" style="color:#b2c831; font-size: 40px;" href="" ng-click="toggleVisibility()" title="Edit Session">&#x270D;</a><div ng-show="visible" ng-transclude></div></div>',
        controller: function($scope) {
            $scope.visible = false;

            $scope.toggleVisibility = function() {
                $scope.visible = !$scope.visible;
            };
        },
        transclude: true,
        scope: {}
    };
});