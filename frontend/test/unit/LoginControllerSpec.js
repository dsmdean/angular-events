'use strict'

describe('LoginController', function() {
    var $controllerConstructor, scope, mockAuthentication, mockGravatarUrlBuilder;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockAuthentication = sinon.stub({ login: function() {} });
        mockGravatarUrlBuilder = sinon.stub({ buildGravatarUrl: function() {} });
    }));

    it('should', function() {
        $controllerConstructor('LoginController', { '$scope': scope, Authentication: mockAuthentication, gravatarUrlBuilder: mockGravatarUrlBuilder });

        var email = "info@testing.com";
        scope.getGravatarUrl(email);

        expect(mockGravatarUrlBuilder.buildGravatarUrl.calledWith(email)).toBe(true);
    });
});