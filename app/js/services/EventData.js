eventsApp.factory('eventData', function($resource) {
    var resource = $resource('http://localhost:3000/events/:id', { id: '@id' }, { "getAll": { method: "GET", isArray: true, params: { something: "foo" } } });

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
        }
    };
});