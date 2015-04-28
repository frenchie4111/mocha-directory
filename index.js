/**
 * This file is licensed under the MIT license
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

(function() {
    'use strict';

    var assert = require( 'chai' ).assert,
        callsite = require( 'callsite' ),
        path = require( 'path' ),
        fs = require( 'fs' ),
        _ = require( 'underscore' );

    assert.isDefined( describe );

    var removeExtension = function( filename ) {
        var filename_split = filename.split( '.' );
        filename_split.pop(); // Remove the last thing, which is the extension
        return filename_split.join( '.' );
    };

    var getCallerRoot = function() {
        var stack = callsite();
        var last_call = stack[ 2 ]; // 2 because we are being called in here too
        return path.dirname( last_call.getFileName() );
    };

    var requireAbsolute = function( absolute_path ) {
        var relative = path.relative( __dirname, removeExtension( absolute_path ) );
        require( './' + relative );
    };

    var recursiveTestImport = function( root_directory ) {
        var file_list = fs.readdirSync( root_directory );

        // Recurse on directories
        _
            .chain( file_list )
            .filter( function( file ) {
                var file_path = path.resolve( root_directory, file );
                return fs.lstatSync( file_path ).isDirectory()
            } )
            .each( function( file ) {
                var file_path = path.resolve( root_directory, file );
                describe( file, function() {
                    recursiveTestImport( file_path );
                } )
            } );

        // Run files
        _
            .chain( file_list )
            .filter( function( file ) {
                return !file.match( /^\..*/ );
            } )
            .map( function( file ) {
                return path.resolve( root_directory, file );
            } )
            .filter( function( file ) {
                return fs.lstatSync( file ).isFile()
            } )
            .each( function( file ) {
                requireAbsolute( file );
            } );
    };

    module.exports = function() {
        recursiveTestImport( getCallerRoot() );
    }

})();