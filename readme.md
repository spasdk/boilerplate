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

Quick start:

```bash
# create project directory structure
npm run init

# build everything
npm run build

# build and start all develop tasks
npm run start
```

### Development build ###

Execute main tasks:

```bash
# create project directory structure
npm run develop init

# start to execute all tasks
npm run develop
```

Execute individual tasks:

```bash
# build everything
npm run develop build

# monitor all file changes and rebuild
npm run develop watch

# start static, livereload and repl services
npm run develop serve

# start only one service
npm run develop repl:start

# show task configuration
npm run develop pug:config

# and so on
```

### Release version ###

Execute main tasks:

```bash
# create project directory structure
npm run release init

# start to execute all tasks
npm run release
```

Execute individual tasks:

```bash
# build everything
npm run release build

# monitor all file changes and rebuild
npm run release watch

# start static and repl services
npm run release serve

# start only one service
npm run release repl:start

# show task configuration
npm run release pug:config

# and so on
```

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/spasdk/boilerplate/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`spa-boilerplate` is released under the [MIT License](license.md).
