'use strict';

describe('AdminEventController', function() {
    var $controllerConstructor, scope, route, mockLocation, mockNgDialog, mockEventData, deferred, data, promise;
    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope, $route, $q) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        route = $route;
        mockLocation = sinon.stub({ path: function() {} });
        mockNgDialog = sinon.stub({ openConfirm: function() {} });
        mockEventData = sinon.stub({ deleteEvent: function() {} });
        deferred = $q.defer();
        promise = deferred.promise;
        route = sinon.stub({
            current: {
                locals: {
                    events: [{ name: 'My first event' }]
                }
            }
        });
        promise.then(function(response) {
            data = response.success;
        });
    }));

    it('should set scope.events to route.current.locals.events', function() {
        $controllerConstructor("AdminEventController", { '$scope': scope, '$route': route, '$location': mockLocation })

        expect(scope.events[0].name).toBe('My first event');
    });

    it('should call $location.path(/admin/editEvent/11) when scope.editEvent(11) is called', function() {
        $controllerConstructor("AdminEventController", { '$scope': scope, '$route': route, '$location': mockLocation })

        spyOn(mockLocation, 'path');
        scope.editEvent(11);

        expect(mockLocation.path).toHaveBeenCalledWith('/admin/editEvent/11');
    });

    it('should call ngDialog.openConfirm when scope.deleteEvent is called', function() {
        $controllerConstructor("AdminEventController", { '$scope': scope, '$route': route, ngDialog: mockNgDialog, eventData: mockEventData })

        spyOn(mockNgDialog, 'openConfirm').and.returnValue(deferred.promise);
        scope.deleteEvent(11);

        expect(mockNgDialog.openConfirm).toHaveBeenCalled();
    });
});