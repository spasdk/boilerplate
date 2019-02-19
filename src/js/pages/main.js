/**
 * Main page implementation.
 */

'use strict';

const
    Component = require('../lib/component');

var page = new Component({
    name: 'page',
    modifiers: ['main']
});


page.$node.textContent = 'main page';


if ( DEVELOP ) {
    window.pageMain = page;
}

// public
module.exports = page;
