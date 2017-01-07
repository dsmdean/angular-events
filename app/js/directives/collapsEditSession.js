'use strict';

eventsApp.directive('collapsEditSession', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><span aria-hidden="true" style="color:#b2c831; font-size: 30px;" class="li_pen fs1" ng-click="toggleVisibility()" title="Edit Session"></span><div ng-show="visible" ng-transclude></div></div>',
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