'use strict';

describe('$localStorage', function() {
    var window;
    beforeEach(module('eventsApp'));

    beforeEach(inject(function($window) {
        window = $window;
        window.localStorage = {};
    }));

    // it('should',
    //     inject(function($localStorage) {
    //         $localStorage.store('user', { _id: 11 });

    //         expect(window.localStorage['user']).toBe({ _id: 11 });
    //     })
    // );
});