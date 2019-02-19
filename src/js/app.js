/**
 * Application core.
 */

'use strict';

const Emitter = require('cjs-emitter');

var app = new Emitter();


// load global app configuration
app.config = require('./config');


// public
module.exports = app;
