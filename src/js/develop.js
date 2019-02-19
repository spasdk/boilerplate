/**
 * Main application entry point wrapper for development mode.
 */

'use strict';

// main entry
require('./main');

// setup
window.LiveReloadOptions = {
    host: location.hostname,
    port: LIVERELOAD_PORT || 35729
};

// inject
require('livereload-js/dist/livereload.js');
