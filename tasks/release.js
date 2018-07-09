/**
 * Release tasks
 */

'use strict';

var // system module
    path     = require('path'),
    // external dependencies
    runner   = require('runner'),
    tools    = require('@runner/tools'),
    logger   = require('@runner/logger'),
    webpack  = require('webpack'),
    UglifyJS = require('uglifyjs-webpack-plugin'),
    // vars with values
    source   = 'src',
    target   = path.join('build', 'release');


// add system task "status"
// to get all tasks running state
//require('node-runner/lib/status');


Object.assign(runner.tasks,
    // activate popup notifications on errors
    require('@runner/generator-notify')(),

    require('@runner/generator-eslint')({
        watch: [
            path.join(source, 'js', '**', '*.js'),
            path.join('tasks', '**', '*.js')
        ]
    }),

    require('@runner/generator-gettext')({
        languages: ['ru'],
        source: path.join(source, 'lang'),
        target: path.join(target, 'lang'),
        jsData: [path.join(source, 'js')]
    }),

    require('@runner/generator-static')({
        open: path.join(target)
    }),

    require('@runner/generator-repl')({
        runner: runner
    }),

    require('@runner/generator-pug')({
        source: path.join(source, 'pug', 'main.pug'),
        target: path.join(target, 'index.html'),
        variables: {
            develop: false,
            package: require('../package')
        }
    }),

    require('@runner/generator-sass')({
        file: path.join(source, 'sass', 'release.scss'),
        outFile: path.join(target, 'main.css'),
        outputStyle: 'compressed',
        sourceMap: path.join(target, 'main.css.map')
    }),

    require('@runner/generator-webpack')({
        mode: 'production',
        entry: path.resolve(path.join(source, 'js', 'main.js')),
        output: {
            filename: 'main.js',
            path: path.resolve(target)
        },
        resolve: {
            alias: {
                'app:config': path.resolve(path.join(source, 'js', 'config.js'))
            }
        },
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJS({
                    uglifyOptions: {
                        output: {
                            comments: false
                        },
                        /* eslint camelcase: 0 */
                        compress: {
                            // display warnings when dropping unreachable code or unused declarations etc.
                            warnings: false,
                            unused: true,
                            dead_code: true,
                            drop_console: true,
                            drop_debugger: true,
                            properties: false
                        }
                    }
                })
            ]
        },
        plugins: [
            // global constants
            new webpack.DefinePlugin({
                DEVELOP: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    })
);

// main tasks
runner.task('init', function ( done ) {
    tools.mkdir([path.join(target, 'lang')], logger.wrap('init'), done);
});

runner.task('copy', function ( done ) {
    tools.copy(
        {
            source: path.join(source, 'img'),
            target: path.join(target, 'img')
        },
        logger.wrap('copy'),
        done
    );
});

runner.task('build', runner.parallel('pug:build', 'sass:build', 'copy', runner.serial('webpack:build', 'gettext:build')));

// eslint-disable-next-line no-unused-vars
runner.task('watch', function ( done ) {
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.watch(path.join(source, 'img', '**', '*'), 'copy');
    runner.run('eslint:watch');
    runner.run('webpack:watch');
});

runner.task('serve', runner.parallel('static:start', 'repl:start', 'notify:start'));

runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
