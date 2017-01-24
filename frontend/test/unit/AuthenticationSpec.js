'use strict';

describe('Authentication', function() {
    var baseURL = 'http://localhost:3000';

    beforeEach(module('eventsApp'));

    // it('should issue a get request to /server/users/logout if logout is called',
    //     inject(function(Authentication, $httpBackend) {
    //         $httpBackend.when('POST', baseURL + '/server/users/register').respond({ response: 'success' });

    //         spyOn(Authentication, 'register').andCallThrough();

    //         var user = Authentication.register({ username: 'user', password: 'password' });
    //         $httpBackend.flush();

    //         expect(user.response).toBe('success');
    //     })
    // );
});