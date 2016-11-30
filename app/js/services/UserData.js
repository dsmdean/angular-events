eventsApp.factory('userData', function($resource) {
    var resource = $resource('/data/user/:userName', {userName:'@userName'}, {"getAll": {method: "GET", isArray:true, params: {something: "foo"}}});
    
    return {
        getUser: function(username) {
            return resource.get({userName:username});
        },
        save: function(user) {
            return resource.save(user);
        },
        getAllProfiles: function() {
            return resource.query();
        }
    };
});