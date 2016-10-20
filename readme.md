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

Remove git metadata, build and start services:

```bash
cd my-project
rm -rf .git
spasdk
# or
DEBUG=* spasdk
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/boilerplate/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-boilerplate` is released under the [MIT License](license.md).
