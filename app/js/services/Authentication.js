eventsApp
    .constant("baseURL", "http://localhost:3000/")
    .factory('Authentication', function($resource, $http, $rootScope, $window, $localStorage, baseURL) {

        var authFac = {};
        var TOKEN_KEY = 'Token';
        var isAuthenticated = false;
        var username = '';
        var userId = '';
        var authToken = undefined;


        function loadUserCredentials() {
            var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
            if (credentials.username != undefined) {
                useCredentials(credentials);
            }
        }

        function storeUserCredentials(credentials) {
            $localStorage.storeObject(TOKEN_KEY, credentials);
            useCredentials(credentials);
        }

        function useCredentials(credentials) {
            isAuthenticated = true;
            username = credentials.username;
            userId = credentials.id;
            authToken = credentials.token;

            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            userId = '';
            isAuthenticated = false;
            $http.defaults.headers.common['x-access-token'] = authToken;
            $localStorage.remove(TOKEN_KEY);
        }

        authFac.login = function(loginData) {

            $resource(baseURL + "users/login")
                .save(loginData,
                    function(response) {
                        if (response.user.admin) {
                            storeUserCredentials({ id: response.user._id, username: loginData.username, token: response.token, admin: response.user.admin });
                        } else {
                            storeUserCredentials({ id: response.user._id, username: loginData.username, token: response.token });
                        }

                        $rootScope.$broadcast('login:Successful');
                        //   userId = response.user;
                    },
                    function(response) {
                        isAuthenticated = false;

                        console.log("Error with login!");
                        console.log(response);
                    }
                );
        };

        authFac.logout = function() {
            $resource(baseURL + "users/logout").get(function(response) {});
            destroyUserCredentials();
        };

        authFac.register = function(registerData) {

            $resource(baseURL + "users/register")
                .save(registerData,
                    function(response) {
                        authFac.login({ username: registerData.username, password: registerData.password });

                        // if (registerData.rememberMe) {
                        //     $localStorage.storeObject('userinfo', { username: registerData.username, password: registerData.password });
                        // }

                        $rootScope.$broadcast('registration:Successful');
                    },
                    function(response) {
                        console.log("Error with registering user!");
                    }
                );
        };

        authFac.isAuthenticated = function() {
            return isAuthenticated;
        };

        authFac.getUsername = function() {
            return username;
        };

        authFac.getUserId = function() {
            return userId;
        };

        loadUserCredentials();

        return authFac;
    });