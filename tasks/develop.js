/**
 * Runner tasks
 */

'use strict';

var path    = require('path'),
    extend  = require('extend'),
    runner  = require('node-runner'),
    webpack = require('webpack'),
    generators = require('spa-tasks'),
    source  = 'src',
    target  = path.join('build', 'develop');


generators.eslint({
    watch: [
        path.join(source, 'js', '**', '*.js'),
        path.join('tasks', '**', '*.js')
    ]
});

generators.pug({
    source: path.join(source, 'pug', 'main.pug'),
    target: path.join(target, 'index.html'),
    variables: {
        develop: true
    }
});

generators.repl({});

generators.sass({
    file: path.join(source, 'sass', 'main.scss'),
    outFile: path.join(target, 'main.css'),
    sourceMap: path.join(target, 'main.css.map')
});

// load default tasks
require('spa-tasks');


extend(true, runner.config, {
    livereload: {
        watch: [
            path.join(target, '**', '*'),
            '!' + path.join(target, '**', '*.map')
        ]
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
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                DEVELOP: true
            })
        ]
    }
});


runner.task('init', function () {
    require('mkdirp').sync(target);
});

runner.task('build', runner.serial('pug:build', 'sass:build', 'webpack:build'));

// eslint-disable-next-line no-unused-vars
runner.task('watch', function ( done ) {
    //runner.watch(path.join(source, 'js', '**', '*.js'), 'webpack:build');
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.run('eslint:watch');
    runner.run('webpack:watch');
    runner.run('livereload:watch');
});

runner.task('serve', runner.parallel('static:start', 'repl:start'));

//runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
runner.task('default', runner.parallel('build', 'watch', 'serve'));
