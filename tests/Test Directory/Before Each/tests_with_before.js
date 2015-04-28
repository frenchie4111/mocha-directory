/**
 * Copyright of Mark One Lifestyle Inc.
 *
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

    var assert = require( 'chai' ).assert;

    it( 'should have value', function() {
        assert( global.before_set == true );
    } );
})();