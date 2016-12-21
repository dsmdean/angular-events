'use strict';

var eventsApp = angular.module('eventsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/newEvent', {
            templateUrl: 'templates/front/NewEvent.html',
            controller: 'EditEventController'
        });
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
        $routeProvider.when('/newProfile', {
            templateUrl: 'templates/front/EditProfile.html',
            controller: 'EditProfileController'
        });
        $routeProvider.when('/profiles', {
            templateUrl: 'templates/front/ProfileList.html',
            controller: 'ProfileListController',
            resolve: {
                users: function($route, userData) {
                    return userData.getAllProfiles().$promise;
                }
            }
        });
        $routeProvider.when('/profile/:username', {
            templateUrl: 'templates/front/Profile.html',
            controller: 'ProfileController',
            resolve: {
                user: function($route, userData) {
                    return userData.getUser($route.current.pathParams.username).$promise;
                }
            }
        });
        $routeProvider.when('/register', {
            templateUrl: 'templates/front/register.html',
            controller: 'EditProfileController'
        });
        $routeProvider.when('/about', {
            template: '<h1>About Us</h1><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus nisl, dictum vel volutpat at, placerat vel leo. Integer eget ante massa. Mauris porta lobortis blandit. Curabitur tempor sodales mi elementum condimentum. Etiam sodales sed sem eu vehicula. In hac habitasse platea dictumst. Vestibulum tempus velit nulla, id auctor lectus tincidunt a. Donec sodales lobortis semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed consectetur ornare ultrices. Praesent molestie eget nunc at viverra. Fusce pulvinar sit amet mi in finibus. Duis et luctus tellus, vehicula lobortis neque.</p><p>Nunc faucibus lacus justo, et egestas justo pretium rhoncus. Sed tortor justo, commodo ut posuere eu, pellentesque in velit. Integer scelerisque vel tortor non maximus. Pellentesque cursus purus eget metus bibendum efficitur. Proin nulla velit, laoreet non ultrices eu, hendrerit in velit. Nam nec dignissim quam, sed tristique elit. Aenean mauris nisl, suscipit quis felis et, euismod consequat nulla. Suspendisse sed rutrum sapien. Fusce dictum finibus iaculis. Nam nec massa et lorem mattis congue. Vestibulum molestie eros sit amet ante convallis, eget sodales lectus ultricies.</p>'
        });
        $routeProvider.otherwise({ redirectTo: '/events' });
        $locationProvider.html5Mode(true);
    });;