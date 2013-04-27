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

### With bower

```sh
bower install assimilate
```

[Learn more about bower](https://github.com/twitter/bower).

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
var deepAssimilate = require('assimilate').withStrategy('deep');
var src = {a: {b: {c: {d: 1}}}};
deepAssimilate(src, {a: {b: {c: {e: 2}}}});
console.log(src);
// {a: {b: {c: {d: 1, e: 2}}}}
```

# API

## assimilate(target, sources…):Object

Extends the target object by applying all properties of each source object in succession, then returns the modified target object.

If `target` is null or undefined, a new object will be used instead. If any of the sources are null or undefined, they will be skipped.

## assimilate.withStrategy(strategy, [copyInherited]):Function

Returns a variant of `assimilate` that uses the given strategy for copying/merging properties.

If `strategy` is set to a string, it must be a case-insensitive match against a strategy in `assimilate.strategies` (see below). Otherwise it must be a function that accepts a `target`, `source` and `key` value and performs a copy or merge on the `target` object.

If `copyInherited` is set to a value that is equal to `true`, properties of the sources' prototypes will be copied in addition to their own properties.

## assimilate.strategies

Contains the built-in copy/merge strategies. These will be performed on the `target`, `source` and `key` for each property `key` in each `source` object.

### DEFAULT

Copies the value of the source's property to the target's property.

### DEEP

If the target's property already exists and is not inherited from the target's prototype, and both properties' values are objects, the objects will be merged recursively. Otherwise, the target's property will be overwritten.

### STRICT

If the value of the source's property is not `undefined`, its value is copied to the target's property.

### FALLBACK

If the value of the target's property is `undefined` or the property does not exist, it will be overwritten with the value of the source's property.

This is useful for merging a configuration object with its defaults.

# License

The MIT/Expat license.
