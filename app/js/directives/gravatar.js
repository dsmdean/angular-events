'use strict';

eventsApp.directive('gravatar', function(gravatarUrlBuilder) {
    return {
        restrict: 'E',
        replace: true,
        template: "<img class='img-circle' width='80px'/>",
        link: function(scope, element, attrs, controller) {
            attrs.$observe('email', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    attrs.$set('src', gravatarUrlBuilder.buildGravatarUrl(newValue));
                }
            });
        }
    };
});