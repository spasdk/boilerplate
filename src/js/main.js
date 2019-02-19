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
    var pages  = {},
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

    //pages.init.fill();
    tabSet.current = pages.init;

    router.on('main', function () {
        console.log('router: main');
    });

    // document.body.append(
    //     app.pages.init.$node,
    //     app.pages.main.$node
    // );
});


// // DOM is ready
// app.once('dom', function () {
//     // load pages
//     app.pages = {
//         init: require('./pages/init'),
//         main: require('./pages/main')
//     };
//
//     // show splash screen
//     app.route(app.pages.init);
// });
//
//
// // everything is ready
// app.once('load', function () {
//     // show main page
//     app.route(app.pages.main);
// });
