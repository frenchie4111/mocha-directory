/**
 * Copyright (C) 2016 Michael Lyons
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

(function() {
    'use strict';

    var assert = require( 'chai' ).assert;

    it( 'should have value', function() {
        assert( global.before_set == true );
    } );
})();