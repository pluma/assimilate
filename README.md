# Synopsis

**assimilate** adds the biological and technological distinctiveness of other objects to its own perfection.

In other words, it extends an object with the properties of other objects. In place.

[![browser support](https://ci.testling.com/pluma/assimilate.png)](https://ci.testling.com/pluma/assimilate)

[![Build Status](https://travis-ci.org/pluma/assimilate.png?branch=master)](https://travis-ci.org/pluma/assimilate)

# Another one?

I admit the idea is hardly novel, but it's amazingly hard to find a library that does just this one thing but works both on npm and with component, has no silly dependencies and follows good practices (like semantic versioning). This may be a case of NIH, but apparently there are many ways to get this simple thing wrong.

# Seriously?

Yes.

# Install

## Node.js

### With NPM

```sh
npm install assimilate
```

### From source

```sh
git clone https://github.com/pluma/assimilate.git
cd assimilate
npm install
make && make dist
```

## Browser

### With component

```sh
component install pluma/assimilate
```

[Learn more about component](https://github.com/component/component).

### With a CommonJS module loader

Download the [latest minified CommonJS release](https://raw.github.com/pluma/assimilate/master/dist/assimilate.min.js) and add it to your project.

[Learn more about CommonJS modules](http://wiki.commonjs.org/wiki/Modules/1.1).

### With an AMD module loader

Download the [latest minified AMD release](https://raw.github.com/pluma/assimilate/master/dist/assimilate.amd.min.js) and add it to your project.

[Learn more about AMD modules](http://requirejs.org/docs/whyamd.html).

### As a standalone library

Download the [latest minified standalone release](https://raw.github.com/pluma/assimilate/master/dist/assimilate.globals.min.js) and add it to your project.

```html
<script src="/your/js/path/assimilate.globals.min.js"></script>
```

This makes the `assimilate` module available in the global namespace.

# Basic usage example

```javascript
var assimilate = require('assimilate');
var src = {a: 1};
assimilate(src, {b: 2}, {c: 3});
console.log(src);
// {a: 1, b: 2, c: 3}
```

# Deep copying example

```javascript
var assimilate = require('assimilate');
var src = {a: {b: {c: {d: 1}}}};
assimilate(src, {a: {b: {c: {e: 2}}}});
console.log(src);
// {a: {b: {c: {d: 1, e: 2}}}}
```

# API

## assimilate([deep], target, sources…):Object

Extends the target object by applying all properties of each source object in succession, then returns the modified target object.

If `deep` is a boolean and set to `true`, existing properties will be extended recursively rather than replaced.

If `target` is null or undefined, a new object will be used instead. If any of the sources are null or undefined, they will be skipped.

# License

The MIT/Expat license.
