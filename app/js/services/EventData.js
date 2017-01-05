eventsApp.factory('eventData', function($resource) {
    var resource = $resource('http://localhost:3000/events/:id', { id: '@id' }, { "getAll": { method: "GET", isArray: true, params: { something: "foo" } } });
    var resourceSession = $resource('http://localhost:3000/events/:eventId/sessions/:sessionId/vote', { eventId: '@eventId', sessionId: '@sessionId' }, { 'update': { method: 'PUT' } });

    return {
        getEvent: function(eventId) {
            return resource.get({ id: eventId });
        },
        save: function(event) {
            // event.id = 999;
            return resource.save(event);
        },
        getAllEvents: function() {
            return resource.query();
        },
        deleteEvent: function(eventId) {
            return resource.delete({ id: eventId });
        },
        voteSession: function(event, session, voteBody) {
            return resourceSession.update({ eventId: event._id, sessionId: session._id }, voteBody);
        }
    };
});