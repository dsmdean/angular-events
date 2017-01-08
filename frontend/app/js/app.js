'use strict';

var eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute', 'ngDialog'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'templates/front/EventList.html',
            controller: 'EventListController',
            resolve: {
                events: function($route, eventData) {
                    return eventData.getAllEvents().$promise;
                }
            }
        });
        $routeProvider.when('/event/:eventId', {
            templateUrl: 'templates/front/EventDetails.html',
            controller: 'EventController',
            resolve: {
                event: function($route, eventData) {
                    return eventData.getEvent($route.current.pathParams.eventId).$promise;
                }
            }
        });
        $routeProvider.when('/register', {
            templateUrl: 'templates/front/register.html',
            controller: 'RegisterController',
            resolve: {
                user: function($route, $location, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $location.path('/user');
                    }
                }
            }
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/front/login.html',
            controller: 'LoginController',
            resolve: {
                user: function($route, $location, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $location.path('/user');
                    }
                }
            }
        });
        $routeProvider.when('/user', {
            templateUrl: 'templates/front/user.html',
            controller: 'UserController',
            resolve: {
                user: function($route, $location, userData, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $location.path('/login');
                    } else {
                        return userData.getUser(Authentication.getUserId()).$promise;
                    }
                }
            }
        });
        $routeProvider.when('/admin/eventlist', {
            templateUrl: 'templates/back/eventList.html',
            controller: 'AdminEventController',
            resolve: {
                events: function($route, $location, eventData, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $location.path('/login');
                    } else if (!Authentication.isAdmin()) {
                        $location.path('/user');
                    } else {
                        return eventData.getAllEvents().$promise;
                    }
                }
            }
        });
        $routeProvider.when('/admin/addEvent', {
            templateUrl: 'templates/back/addEvent.html',
            controller: 'AdminAddEventController',
            resolve: {
                events: function($route, $location, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $location.path('/login');
                    } else if (!Authentication.isAdmin()) {
                        $location.path('/user');
                    }
                }
            }
        });
        $routeProvider.when('/admin/editEvent/:eventId', {
            templateUrl: 'templates/back/editEvent.html',
            controller: 'AdminEditEventController',
            resolve: {
                event: function($route, $location, eventData, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $location.path('/login');
                    } else if (!Authentication.isAdmin()) {
                        $location.path('/user');
                    } else {
                        return eventData.getEvent($route.current.pathParams.eventId).$promise;
                    }
                }
            }
        });
        $routeProvider.when('/admin/userlist', {
            templateUrl: 'templates/back/userList.html',
            controller: 'AdminUserController',
            resolve: {
                users: function($route, $location, userData, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $location.path('/login');
                    } else if (!Authentication.isAdmin()) {
                        $location.path('/user');
                    } else {
                        return userData.getAllUsers().$promise;
                    }
                }
            }
        });
        $routeProvider.when('/about', {
            template: '<h1>About Us</h1><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus nisl, dictum vel volutpat at, placerat vel leo. Integer eget ante massa. Mauris porta lobortis blandit. Curabitur tempor sodales mi elementum condimentum. Etiam sodales sed sem eu vehicula. In hac habitasse platea dictumst. Vestibulum tempus velit nulla, id auctor lectus tincidunt a. Donec sodales lobortis semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed consectetur ornare ultrices. Praesent molestie eget nunc at viverra. Fusce pulvinar sit amet mi in finibus. Duis et luctus tellus, vehicula lobortis neque.</p><p>Nunc faucibus lacus justo, et egestas justo pretium rhoncus. Sed tortor justo, commodo ut posuere eu, pellentesque in velit. Integer scelerisque vel tortor non maximus. Pellentesque cursus purus eget metus bibendum efficitur. Proin nulla velit, laoreet non ultrices eu, hendrerit in velit. Nam nec dignissim quam, sed tristique elit. Aenean mauris nisl, suscipit quis felis et, euismod consequat nulla. Suspendisse sed rutrum sapien. Fusce dictum finibus iaculis. Nam nec massa et lorem mattis congue. Vestibulum molestie eros sit amet ante convallis, eget sodales lectus ultricies.</p>'
        });
        $routeProvider.otherwise({ redirectTo: '/events' });
        $locationProvider.html5Mode(true);
    });;