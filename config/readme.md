Application configuration files
===============================

The directory contains all application configuration files.

File `app.js` can store run-time options, API urls, paths, execution flags and so on.

File `gulp.js` can redefine default configuration options for all gulp tasks.

For example:

```js
module.exports = {
    jade: {
        profiles: {
            default: {
                sourcePath: 'pug'
            },
            develop: {
                targetFile: 'debug.html'
            }
        }
    },
    sass: {
        active: false
    }
};
```

This will add the following changes:

* set `pug` as the directory to look for source files (instead of default `jade`) for all Jade profiles
* set `debug.html` as  the intended output file name (instead of default `develop.html`) for Jade `develop` profile only
* completely disable all SASS tasks


To make sure all options are correct it's possible to print the current config set:

```bash
gulp jade:config
```
