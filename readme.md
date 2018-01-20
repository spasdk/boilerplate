Application template
====================

[![build status](https://img.shields.io/travis/spasdk/boilerplate.svg?style=flat-square)](https://travis-ci.org/spasdk/boilerplate)
[![dependencies status](https://img.shields.io/david/spasdk/boilerplate.svg?style=flat-square)](https://david-dm.org/spasdk/boilerplate)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/boilerplate.svg?style=flat-square)](https://david-dm.org/spasdk/boilerplate?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


## Usage ##

Create a new project base:

```bash
git clone https://github.com/spasdk/boilerplate.git my-project
```

Remove git metadata and install dependencies:

```bash
cd my-project
rm -rf .git
npm install
```

Execute npm scripts:

```bash
# init build structure
npm run develop init

# build everything
npm run develop build

# monitor all file changes and rebuild
npm run develop watch

# start static, livereload and repl services
npm run develop serve

# start only one service
npm run develop repl:start

# show all task with statuses
npm run develop status

# show task configuration
npm run develop pug:config

# and so on
```

The same commands are possible for release profile.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/spasdk/boilerplate/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`spa-boilerplate` is released under the [MIT License](license.md).
