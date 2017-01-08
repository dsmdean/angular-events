    'use strict';

    eventsApp.factory('userData', function($resource) {
        var resource = $resource('http://localhost:3000/server/users/:id', { id: '@id' }, { "update": { method: "PUT" } });

        return {
            getUser: function(userId) {
                return resource.get({ id: userId });
            },
            getAllUsers: function() {
                return resource.query();
            },
            updateUser: function(user) {
                return resource.update({ id: user._id }, user);
            },
            deleteUser: function(userId) {
                return resource.delete({ id: userId });
            }
        };
    });