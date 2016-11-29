eventsApp.factory('userData', function($resource) {
    var resource = $resource('/data/user/:userName', {userName:'@userName'}, {"getAll": {method: "GET", isArray:true, params: {something: "foo"}}});
    
    return {
        getUser: function() {
            return resource.get({userName:1});
        },
        save: function(user) {
            return resource.save(user);
        }
    };
});