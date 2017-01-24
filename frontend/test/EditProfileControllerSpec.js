'use strict';

describe('EditProfileControllerSpec', function () {
    var $controllerConstructor, scope, mockGravatarUrlBuilder, mockUserData;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        mockGravatarUrlBuilder = sinon.stub({buildGravatarUrl: function() {}});
        mockUserData = sinon.stub({save: function() {}});
    }));

    it('should build the gravatar with the given email', function() {
        $controllerConstructor("EditProfileController",
            {'$scope': scope, gravatarUrlBuilder: mockGravatarUrlBuilder});
        var email = "info@dsmdean.com";

        scope.getGravatarUrl(email);

        expect(mockGravatarUrlBuilder.buildGravatarUrl.calledWith(email)).toBe(true);
    });

    // it('should save profile with the given user data', function() {
    //     $controllerConstructor("EditProfileController",
    //         {'$scope': scope, userData: mockUserData});
    //     var user = {name: "Dean Menso"};
    //     var newUserForm = "";

    //     scope.saveEvent(user, newUserForm);

    //     expect(mockUserData.save.calledWith(user)).toBe(true);
    // });
});