'use strict';

describe('eventData', function() {
    var baseURL = 'http://localhost:3000';
    beforeEach(module('eventsApp'));

    it('should return the correct data when getEvent is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('GET', baseURL + '/server/events/11').respond({ name: 'My Event' });
            var event = eventData.getEvent(11);
            $httpBackend.flush();

            expect(event.name).toBe('My Event');
        })
    );

    it('should issue a save request to /server/events when save is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('POST', baseURL + '/server/events').respond({ response: 'success' });
            var event = eventData.save({ name: 'My Event' });
            $httpBackend.flush();

            expect(event.response).toBe('success');
        })
    );

    it('should issue a put request to /server/events/11 when updateEvent is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('PUT', baseURL + '/server/events/11').respond({ response: 'success' });
            var event = eventData.updateEvent({ _id: 11, name: 'Awesome event' });
            $httpBackend.flush();

            expect(event.response).toBe('success');
        })
    );

    it('should issue a GET request to /server/events when getAllEvents is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('GET', baseURL + '/server/events').respond([{ name: 'Name of my Event' }]);
            var event = eventData.getAllEvents();
            $httpBackend.flush();

            expect(event[0].name).toBe('Name of my Event');
        })
    );

    it('should issue a delete request to /server/events/11 when deleteEvent is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('DELETE', baseURL + '/server/events/11').respond({ response: 'success' });
            var event = eventData.deleteEvent(11);
            $httpBackend.flush();

            expect(event.response).toBe('success');
        })
    );

    if ('should issue a put request to /server/events/11/sessions/11/vote when voteSession is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('PUT', baseURL + '/server/events/11/sessions/11/vote').respond({ response: 'success' });
            var vote = eventData.voteSession({ _id: 11 }, { _id: 11 }, { vote: +1 });
            $httpBackend.flush();

            expect(vote.response).toBe('success');
        })
    );

    it('should issue a post request to /server/events/11/sessions when addNewSession is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('POST', baseURL + '/server/events/11/sessions').respond({ response: 'success' });
            var session = eventData.addNewSession(11, { name: 'My Session' });
            $httpBackend.flush();

            expect(session.response).toBe('success');
        })
    );

    it('should issue a put request to /server/events/11/sessions/11 when updateSession is called',
        inject(function(eventData, $httpBackend) {
            $httpBackend.when('PUT', baseURL + '/server/events/11/sessions/11').respond({ response: 'success' });
            var session = eventData.updateSession(11, { _id: 11, name: 'My session name' });
            $httpBackend.flush();

            expect(session.response).toBe('success');
        })
    );
});