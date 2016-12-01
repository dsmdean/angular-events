'use strict';

eventsApp.directive('submitEnter', function(eventData) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            element.on('keydown', function(event) {
                if(isEnterKeyCode(event.keyCode)) {
                    var formName = attrs.$observe('name', function(value) {
                        return value;
                    });

                    controller.saveEvent(scope.event, formName);
                }
            });
        }
    };

    function isEnterKeyCode(keyCode) {
        return event.keyCode === 13;
    }
});