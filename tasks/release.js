/**
 * Runner tasks
 */

'use strict';

var path    = require('path'),
    util    = require('util'),
    runner  = require('node-runner'),
    tools   = require('node-runner/lib/tools'),
    webpack = require('webpack'),
    tasks   = require('spa-tasks'),
    pkgData = require(path.join(process.cwd(), 'package.json')),
    wpkData = require(path.join(path.dirname(require.resolve('webpack')), '..', 'package.json')),
    source  = 'src',
    target  = path.join('build', 'release');


// activate popup notifications on errors
require('node-runner/lib/notify');

// add system task "status"
// to get all tasks running state
require('node-runner/lib/status');


tasks.eslint({
    watch: [
        path.join(source, 'js', '**', '*.js'),
        path.join('tasks', '**', '*.js')
    ]
});

tasks.gettext({
    languages: ['ru'],
    source: path.join(source, 'lang'),
    target: path.join(target, 'lang'),
    jsData: path.join(target, 'main.js')
});

tasks.pug({
    source: path.join(source, 'pug', 'main.pug'),
    target: path.join(target, 'index.html'),
    variables: {
        develop: false,
        package: require('../package')
    }
});

tasks.repl({});

tasks.sass({
    file: path.join(source, 'sass', 'release.scss'),
    outFile: path.join(target, 'main.css'),
    outputStyle: 'compressed',
    sourceMap: path.join(target, 'main.css.map')
});

tasks.static({
    open: path.join(target)
});

tasks.webpack({
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
        // global constants
        new webpack.DefinePlugin({
            DEVELOP: false
        }),
        // obfuscation
        new webpack.optimize.UglifyJsPlugin({
            // this option prevents name changing
            // use in case of strange errors
            // mangle: false,
            sourceMap: false,
            output: {
                comments: false
            },
            /* eslint camelcase: 0 */
            compress: {
                warnings: false,
                unused: true,
                dead_code: true,
                drop_console: true,
                drop_debugger: true,
                properties: false,
                pure_funcs: []
            }
        }),
        // add comment to the top of app.js
        new webpack.BannerPlugin(util.format(
            '%s v%s (webpack: v%s)',
            pkgData.name, pkgData.version, wpkData.version
        ))
    ]
});


runner.task('init', function ( done ) {
    tools.mkdir([target], runner.log.wrap('init'), function ( error ) {
        done(error);
    });
});

runner.task('build', runner.serial('pug:build', 'sass:build', 'webpack:build'));

// eslint-disable-next-line no-unused-vars
runner.task('watch', function ( done ) {
    //runner.watch(path.join(source, 'js', '**', '*.js'), 'webpack:build');
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.run('eslint:watch');
    runner.run('webpack:watch');
});

runner.task('serve', runner.parallel('static:start', 'repl:start'));

//runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
runner.task('default', runner.parallel('build', 'watch', 'serve'));
