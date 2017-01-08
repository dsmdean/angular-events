'use strict';

describe('eventData', function() {

    beforeEach(module('eventsApp'));

    it('should issue a GET request to /data/event/11 when getEvent is called and the id is 11',
        inject(function(eventData, $httpBackend) {
            $httpBackend.expectGET('/data/event/11');
            $httpBackend.when('GET', '/data/event/11').respond({});
            eventData.getEvent(11);
            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        })
    );

    it('should return the correct data when getevent is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('GET', '/data/event/11').respond({name: 'My Event'});
            var event = eventData.getEvent(11);
            $httpBackend.flush();

            expect(event.name).toBe('My Event');
        })
    );

    it('should issue a save request to /data/event when save is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('POST', '/data/event').respond({response: 'success'});
            var event = eventData.save({name: 'My Event'});
            $httpBackend.flush();

            expect(event.response).toBe('success');
        })
    );

    it('should issue a GET request to /data/event when getAllEvents is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('GET', '/data/event').respond([{name: 'Name of my Event'}]);
            var event = eventData.getAllEvents();
            $httpBackend.flush();

            expect(event[0].name).toBe('Name of my Event');
        })
    );
});