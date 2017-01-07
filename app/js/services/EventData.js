eventsApp.factory('eventData', function($resource) {
    var resource = $resource('http://localhost:3000/events/:id', { id: '@id' }, { 'update': { method: 'PUT' } });
    var resourceVote = $resource('http://localhost:3000/events/:eventId/sessions/:sessionId/vote', { eventId: '@eventId', sessionId: '@sessionId' }, { 'update': { method: 'PUT' } });
    var resourceSession = $resource('http://localhost:3000/events/:eventId/sessions/:sessionId', { eventId: '@eventId', sessionId: '@sessionId' }, { 'update': { method: 'PUT' } });

    return {
        getEvent: function(eventId) {
            return resource.get({ id: eventId });
        },
        save: function(event) {
            // event.id = 999;
            return resource.save(event);
        },
        updateEvent: function(event) {
            // event.id = 999;
            return resource.update({ id: event._id }, event);
        },
        getAllEvents: function() {
            return resource.query();
        },
        deleteEvent: function(eventId) {
            return resource.delete({ id: eventId });
        },
        voteSession: function(event, session, voteBody) {
            return resourceVote.update({ eventId: event._id, sessionId: session._id }, voteBody);
        },
        addNewSession: function(eventId, session) {
            return resourceSession.save({ eventId: eventId }, session);
        },
        updateSession: function(eventId, session) {
            return resourceSession.update({ eventId: eventId, sessionId: session._id }, session);
        }
    };
});