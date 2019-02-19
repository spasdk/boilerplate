/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var router = {},
    routes = {};


router.on = function ( path, callback ) {
    routes[path] = callback;
};


// public
module.exports = router;
