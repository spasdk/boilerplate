/**
 * Main SDK entry point.
 */

'use strict';

var path    = require('path'),
    extend  = require('extend'),
    runner  = require('node-runner'),
    source  = 'src',
    target  = path.join('build', 'develop');


// load default tasks
require('spa-tasks');


extend(true, runner.config, {
    pug: {
        source: path.join(source, 'pug', 'main.pug'),
        target: path.join(target, 'index.html'),
        variables: {
            develop: true
        }
    },
    sass: {
        file: path.join(source, 'sass', 'main.scss'),
        outFile: path.join(target, 'main.css'),
        sourceMap: path.join(target, 'main.css.map')
    },
    static: {
        open: path.join(target),
        port: 5000
    },
    webpack: {
        entry: path.resolve(path.join(source, 'js', 'main.js')),
        output: {
            filename: 'main.js',
            path: path.resolve(target),
            sourceMapFilename: 'main.js.map'
        },
        resolve: {
            alias: {
                'app:config': path.resolve(path.join(source, 'js', 'config.js'))
            }
        },
        devtool: 'source-map'
    }
});


runner.task('build', runner.serial('pug:build', 'sass:build', 'webpack:build'));

runner.task('watch', function ( done ) {
    //runner.watch(path.join(source, 'js', '**', '*.js'), 'webpack:build');
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.run('webpack:watch');
});

runner.task('serve', runner.parallel('static:start', 'repl:start'));

//runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
runner.task('default', runner.parallel('build', 'watch', 'serve'));
