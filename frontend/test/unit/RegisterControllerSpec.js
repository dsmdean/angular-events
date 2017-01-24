'use strict'

describe('RegisterController', function() {
    var $controllerConstructor, scope, mockAuthentication, mockGravatarUrlBuilder;
    beforeEach(module('eventsApp'));

    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockAuthentication = sinon.stub({ register: function() {} });
        mockGravatarUrlBuilder = sinon.stub({ buildGravatarUrl: function() {} });
    }));

    it('should test getGravatarUrl function', function() {
        $controllerConstructor('RegisterController', { '$scope': scope, Authentication: mockAuthentication, gravatarUrlBuilder: mockGravatarUrlBuilder });

        var email = "info@testing.com";
        scope.getGravatarUrl(email);

        expect(mockGravatarUrlBuilder.buildGravatarUrl.calledWith(email)).toBe(true);
    });

    it('should test register function', function() {
        $controllerConstructor('RegisterController', { '$scope': scope, Authentication: mockAuthentication, gravatarUrlBuilder: mockGravatarUrlBuilder });

        // var newUserForm = sinon.stub({ $valid: true });
        // newUserForm = { $valid: true };
        var user = { name: 'My name' };
        scope.register(user);

        expect(mockAuthentication.register.calledWith(user)).toBe(true);
    });
});