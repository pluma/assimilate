# Synopsis

**assimilate** adds the biological and technological distinctiveness of other objects to its own perfection.

In other words, it extends an object with the properties of other objects. In place.

[![browser support](https://ci.testling.com/pluma/assimilate.png)](https://ci.testling.com/pluma/assimilate)

[![Build Status](https://travis-ci.org/pluma/assimilate.png?branch=master)](https://travis-ci.org/pluma/assimilate) [![NPM version](https://badge.fury.io/js/assimilate.png)](http://badge.fury.io/js/assimilate) [![Dependencies](https://david-dm.org/pluma/assimilate.png)](https://david-dm.org/pluma/assimilate)

# Another one?

I admit the idea is hardly novel, but it's amazingly hard to find a library that does just this one thing but works both on npm and with component, has no silly dependencies and follows good practices (like semantic versioning). This may be a case of NIH, but apparently there are many ways to get this simple thing wrong.

Also, as of version 0.3.0, assimilate comes with a strategy for copying property descriptors, which is useful if you're not stuck in IE8 and want to use modern language features. If you *are* stuck in IE8, all the other strategies should work just fine.

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
make dist && make
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
var obj = {a: 1};
assimilate(obj, {b: 2}, {c: 3});
console.log(obj);
// {a: 1, b: 2, c: 3}
```

# Deep copying example

```javascript
var deepAssimilate = require('assimilate').withStrategy('deep');
var obj = {a: {b: {c: {d: 1}}}};
deepAssimilate(obj, {a: {b: {c: {e: 2}}}});
console.log(obj);
// {a: {b: {c: {d: 1, e: 2}}}}
```

# Property descriptor example

```javascript
var properAssimilate = require('assimilate').withStrategy('proper');
var obj = {b: 1};
properAssimilate(obj, {get a() {return 2;}});
console.log(obj);
// {b: 1, a: [Getter]}
```

# API

## assimilate(target, sources…):Object

Extends the target object by applying all properties of each source object in succession, then returns the modified target object.

If `target` is null or undefined, a new object will be used instead. If any of the sources are null or undefined, they will be skipped.

This function is the equivalent of `assimilate.withStrategy('default')`.

## assimilate.withStrategy(strategy):Function

Returns a variant of `assimilate` that uses the given strategy for copying/merging properties.

If `strategy` is set to a string, it must be a case-insensitive match against a strategy in `assimilate.strategies` (see below). Otherwise it must be an object with a method `keysFn` that accepts an object and returns an array of property names, and a method `copyFn` that accepts a `target`, `key` and `source` value and performs a copy or merge on the `target` object.

## assimilate.strategies

Contains the built-in copy/merge strategies. These will be performed on the `target`, `source` and `key` for each property `key` in each `source` object.

### DEFAULT

Copies the values of all properties of the source to the target, except for inherited properties.

### PROPER

Defines all of the source's own properties on the target object using the source's property descriptors.

This can be used to copy the source's getters and setters rather than their current values.

### INHERITED

Copies the values of all properties of the source to the target, including inherited properties.

### DEEP

Copies the values of all properties of the source to the target, except for inherited properties. If the property already exists and both values are objects, the object's properties will be merged recursively.

### STRICT

Copies the values of all properties of the source to the target, except for inherited properties. If the source property's value is `undefined`, it will be skipped.

### FALLBACK

Copies the values of all properties of the source that do not already exist or are set to `undefined` on the target, except inherited properties.

This can be useful for merging a configuration object with its defaults.

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/assimilate/blob/master/UNLICENSE) file.