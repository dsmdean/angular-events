'use strict';

describe('AdminUserController', function() {
    var $controllerConstructor, scope, route, mockNgDialog, deferred, data, promise;
    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope, $route, $q) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        route = $route;
        mockNgDialog = sinon.stub({ openConfirm: function() {} });
        deferred = $q.defer();
        promise = deferred.promise;
        route = sinon.stub({
            current: {
                locals: {
                    users: [{ name: 'User name' }]
                }
            }
        });
        promise.then(function(response) {
            data = response.success;
        });
    }));

    it('should set scope.users to route.current.locals.users', function() {
        $controllerConstructor("AdminUserController", { '$scope': scope, '$route': route })

        expect(scope.users[0].name).toBe('User name');
    });

    it('should call ngDialog.openConfirm when scope.deleteUser is called', function() {
        $controllerConstructor("AdminUserController", { '$scope': scope, '$route': route, ngDialog: mockNgDialog })

        spyOn(mockNgDialog, 'openConfirm').and.returnValue(deferred.promise);
        scope.deleteUser(11);

        expect(mockNgDialog.openConfirm).toHaveBeenCalled();
    });
});