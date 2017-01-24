'use strict';

describe('EventController', function() {
    var $controllerConstructor, scope, route, mockEventData, mockAuthentication, deferred;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope, $route, $q) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        route = $route;
        route = sinon.stub({
            current: {
                locals: {
                    event: { name: 'My event' }
                }
            }
        });
        mockAuthentication = sinon.stub({ isAuthenticated: function() {}, getUserId: function() {} });
        mockEventData = sinon.stub({ voteSession: function() {} });
        deferred = $q.defer();
    }));

    it('should set the scope event to the result of $route.current.locals.event', function() {
        $controllerConstructor("EventController", { '$scope': scope, '$route': route });

        expect(scope.event.name).toBe('My event');
    });

    it('should call scope.validateLogin with the same session that is passed into scope.upVoteSession and 1 as the second argument', function() {
        $controllerConstructor('EventController', { '$scope': scope, '$route': route });
        spyOn(scope, 'validateLogin');

        var session = { name: 'Session name' };
        scope.upVoteSession(session);

        expect(scope.validateLogin).toHaveBeenCalledWith(session, 1);
    });

    it('should call scope.validateLogin, if upVoteCount > 0, with the same session that is passed into scope.downVoteSession and -1 as the second argument', function() {
        $controllerConstructor('EventController', { '$scope': scope, '$route': route });
        spyOn(scope, 'validateLogin');

        var session = { name: 'Session name', upVoteCount: 2 };
        scope.downVoteSession(session);

        expect(scope.validateLogin).toHaveBeenCalledWith(session, -1);
    });

    it('should not call scope.validateLogin, if upVoteCount == 0', function() {
        $controllerConstructor('EventController', { '$scope': scope, '$route': route });
        spyOn(scope, 'validateLogin');

        var session = { name: 'Session name', upVoteCount: 0 };
        scope.downVoteSession(session);

        expect(scope.validateLogin).not.toHaveBeenCalled();
    });

    it('should set local variables, scope.voteBody.vote & scope.voteBody.userId, in scope.validateLogin using the argument passed in, vote, and Authentication.getUserId - if isAuthenticated is true',
        function() {
            $controllerConstructor('EventController', { '$scope': scope, '$route': route, Authentication: mockAuthentication });

            mockAuthentication.isAuthenticated = function() {
                return true;
            };
            mockAuthentication.getUserId = function() {
                return 11;
            };

            var session = { name: 'Session name' };
            var vote = 1;

            scope.validateLogin(session, vote);

            expect(scope.voteBody.vote).toBe(vote);
            expect(scope.voteBody.userId).toBe(11);
        }
    );

    // it('should call eventData.voteSession with scope.event, session (passed into validateLogin), scope.voteBody',
    //     function() {
    //         $controllerConstructor('EventController', { '$scope': scope, '$route': route, eventData: mockEventData, Authentication: mockAuthentication });

    //         mockAuthentication.isAuthenticated = function() {
    //             return true;
    //         };
    //         mockAuthentication.getUserId = function() {
    //             return 11;
    //         };
    //         spyOn(eventData, 'voteSession').and.returnValue(deferred.promise);

    //         var session = { name: 'Session name' };
    //         var vote = 1;

    //         scope.validateLogin(session, vote);

    //         expect(eventData.voteSession).toHaveBeenCalled();
    //     }
    // );
});