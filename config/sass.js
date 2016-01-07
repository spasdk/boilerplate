/**
 * SASS configuration for sass gulp task.
 *
 * @see https://github.com/sass/node-sass
 */

'use strict';

// public
module.exports = {
    // turn on/off translation
    active: true,

    // config for sass:develop task
    develop: {
        // whether to use space or tab character for indentation
        indentType: 'space',

        // the number of spaces or tabs to be used for indentation
        indentWidth: 4,

        // whether to use cr, crlf, lf or lfcr sequence for line break
        linefeed: 'lf',

        // output format of the final CSS style
        // options: nested, expanded, compact, compressed
        outputStyle: 'nested',

        // how many digits after the decimal will be allowed
        precision: 2,

        // additional debugging information in the output file as CSS comments
        sourceComments: false,

        // the writing location for the source map file
        // options: file name, true - inline source map, false - disable
        sourceMap: 'develop.map'
    },

    // config for sass:release task
    release: {
        // whether to use space or tab character for indentation
        indentType: 'space',

        // the number of spaces or tabs to be used for indentation
        indentWidth: 4,

        // whether to use cr, crlf, lf or lfcr sequence for line break
        linefeed: 'lf',

        // output format of the final CSS style
        // options: nested, expanded, compact, compressed
        outputStyle: 'compressed',

        // how many digits after the decimal will be allowed
        precision: 2,

        // additional debugging information in the output file as CSS comments
        sourceComments: false,

        // the writing location for the source map file
        // options: file name, true - inline source map, false - disable
        sourceMap: false
    }
};
