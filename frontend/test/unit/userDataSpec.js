'use strict';

describe('userData', function() {
    var baseURL = 'http://localhost:3000';
    beforeEach(module('eventsApp'));

    // it('should issue a GET request to /server/users/11 when getUser is called and the id is 11',
    //     inject(function(userData, $httpBackend) {
    //         $httpBackend.expectGET(baseURL + '/server/users/11');
    //         $httpBackend.when('GET', baseURL + '/server/users/11').respond({});
    //         userData.getUser(11);
    //         $httpBackend.flush();

    //         $httpBackend.verifyNoOutstandingExpectation();
    //         $httpBackend.verifyNoOutstandingRequest();
    //     })
    // );

    it('should return the correct data when getUser is called',
        inject(function(userData, $httpBackend) {
            $httpBackend.when('GET', baseURL + '/server/users/11').respond({ name: 'My name' });
            var user = userData.getUser(11);
            $httpBackend.flush();

            expect(user.name).toBe('My name');
        })
    );

    it('should return the correct data when getAllUsers is called',
        inject(function(userData, $httpBackend) {
            $httpBackend.when('GET', baseURL + '/server/users').respond([{ name: 'My Name' }]);
            var users = userData.getAllUsers();
            $httpBackend.flush();

            expect(users[0].name).toBe('My Name');
        })
    );

    it('should issue a put request to /server/users/11 when updateUser is called',
        inject(function(userData, $httpBackend) {
            $httpBackend.when('PUT', baseURL + '/server/users/11').respond({ response: 'success' });
            var user = userData.updateUser({ _id: 11, name: 'Awesome Name' });
            $httpBackend.flush();

            expect(user.response).toBe('success');
        })
    );

    it('should issue a delete request to /server/users/11 when deleteUser is called',
        inject(function(userData, $httpBackend) {
            $httpBackend.when('DELETE', baseURL + '/server/users/11').respond({ response: 'success' });
            var user = userData.deleteUser(11);
            $httpBackend.flush();

            expect(user.response).toBe('success');
        })
    );
});