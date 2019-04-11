/**
 * Main application entry point.
 */

'use strict';

const
    gettext = require('spa-gettext'),
    TabSet  = require('./lib/components/tab-set'),
    router  = require('./lib/router'),
    app     = require('./app');


// load localization
gettext.load({name: app.config.language}, function () {
    const
        pages  = {},
        tabSet = new TabSet({
            $node: document.body,
            content: [
                pages.init = require('./pages/init'),
                pages.main = require('./pages/main')
            ]
        });

    pages.init.addListener('submit', function () {
        tabSet.current = pages.main;
    });

    tabSet.current = pages.init;

    router.on('main', function () {
        console.log('router: main');
    });
});
