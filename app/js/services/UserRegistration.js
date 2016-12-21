eventsApp.factory('userRegistration', function($resource) {
    var resource = $resource('http://localhost:3000/users/register', {});

    return {
        save: function(user) {
            return resource.save(user);
        }
    };
});