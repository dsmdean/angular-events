'use strict';

describe('EventListController', function() {
    var $controllerConstructor, scope, mockEventData, route;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope, $route) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockEventData = sinon.stub({ getAllEvents: function() {} });
        route = $route;
        route = sinon.stub({
            current: {
                locals: {
                    events: [{ name: 'My event' }]
                }
            }
        });
    }));

    it('should set the scope events to the result of $route.current.locals.events', function() {
        $controllerConstructor("EventListController", { '$scope': scope, '$route': route });

        expect(scope.events[0].name).toBe('My event');
    })
});