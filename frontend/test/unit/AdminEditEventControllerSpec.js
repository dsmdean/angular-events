'use strict';

describe('AdminEditEventController', function() {
    var $controllerConstructor, scope, route;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope, $route) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        route = $route;
        route = sinon.stub({
            current: {
                locals: {
                    event: { name: 'My event' }
                }
            }
        });
    }));

    it('scope.event should be set to route.current.locals.event & scope.toggleAddSession should be false', function() {
        $controllerConstructor("AdminEditEventController", { '$scope': scope, '$route': route });

        expect(scope.event.name).toBe('My event');
        expect(scope.toggleAddSession).toBeFalsy();
    });

    it('scope.toggleAddSession should be true after calling scope.toggleNewSession', function() {
        $controllerConstructor("AdminEditEventController", { '$scope': scope, '$route': route });

        scope.toggleNewSession();

        expect(scope.toggleAddSession).toBeTruthy();
    })
});