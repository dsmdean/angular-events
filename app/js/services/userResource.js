'use strict';

eventsApp.factory('userResource', ['$resource', function($resource) {
    var service = $resource('http://localhost:3000/users/:id', { userName: '@userName' }, {});

    service.queryAll = function(callback) {
        return service.query({}, callback)
    };

    return service;
}]);