'use strict';

describe('HeaderController', function() {
    var $controllerConstructor, rootScope, scope, mockLocation, mockAuthentication;
    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockAuthentication = sinon.stub({ isAuthenticated: function() {}, isAdmin: function() {}, logout: function() {} });
        mockLocation = sinon.stub({ path: function() {} });
    }));

    it('should test Authentication.isAuthenticated - isAdmin:false', function() {
        mockAuthentication.isAuthenticated = function() {
            return true;
        };
        mockAuthentication.isAdmin = function() {
            return false;
        };

        $controllerConstructor('HeaderController', { '$scope': scope, '$location': mockLocation, Authentication: mockAuthentication });

        expect(scope.loggedIn).toBeTruthy();
        expect(scope.admin).toBeFalsy();
    });

    it('should test Authentication.isAuthenticated - isAdmin:true', function() {
        mockAuthentication.isAuthenticated = function() {
            return true;
        };
        mockAuthentication.isAdmin = function() {
            return true;
        };

        $controllerConstructor('HeaderController', { '$scope': scope, '$location': mockLocation, Authentication: mockAuthentication });

        expect(scope.loggedIn).toBeTruthy();
        expect(scope.admin).toBeTruthy();
    });

    it('should test $rootScope.$on login:Succesful - isAdmin:false', function() {
        mockAuthentication.isAuthenticated = function() {
            return false;
        };
        mockAuthentication.isAdmin = function() {
            return false;
        };

        $controllerConstructor('HeaderController', { '$scope': scope, '$rootScope': rootScope, '$location': mockLocation, Authentication: mockAuthentication });

        rootScope.$broadcast('login:Successful');
        rootScope.$digest();

        expect(scope.loggedIn).toBeTruthy();
        expect(scope.admin).toBeFalsy();
        expect(mockLocation.path.calledWith('user')).toBe(true);
    });

    it('should test $rootScope.$on login:Succesful - isAdmin:true', function() {
        mockAuthentication.isAuthenticated = function() {
            return false;
        };
        mockAuthentication.isAdmin = function() {
            return true;
        };

        $controllerConstructor('HeaderController', { '$scope': scope, '$rootScope': rootScope, '$location': mockLocation, Authentication: mockAuthentication });

        rootScope.$broadcast('login:Successful');
        rootScope.$digest();

        expect(scope.loggedIn).toBeTruthy();
        expect(scope.admin).toBeTruthy();
        expect(mockLocation.path.calledWith('user')).toBe(true);
    });

    it('should test the logout function', function() {
        $controllerConstructor('HeaderController', { '$scope': scope, '$location': mockLocation, Authentication: mockAuthentication });

        spyOn(mockAuthentication, 'logout');
        spyOn(mockLocation, 'path');
        scope.logOut();

        expect(mockAuthentication.logout).toHaveBeenCalled();
        expect(scope.loggedIn).toBeFalsy();
        expect(scope.admin).toBeFalsy();
        expect(mockLocation.path).toHaveBeenCalled();
    });
});