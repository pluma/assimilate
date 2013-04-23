/*! assimilate 0.1.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
(function(root){var module={};
var slice = Array.prototype.slice;

function assimilate(deep, target) {
    var sources, i, source, key, value;
    if (arguments.length > 1 && typeof deep === 'boolean') {
        sources = slice.call(arguments, 2);
    } else {
        sources = slice.call(arguments, 1);
        target = deep;
        deep = false;
    }
    if (target === undefined || target === null) {
        target = {};
    }
    for (i = 0; i < sources.length; i++) {
        source = sources[i];
        if (source === undefined || source === null) continue;
        for (key in source) {
            value = source[key];
            if (!source.hasOwnProperty(key)) continue;
            if (deep && typeof value === 'object' && typeof target[key] === 'object') {
                assimilate(true, target[key], value);
            } else {
                target[key] = value;
            }
        }
    }
    return target;
}
module.exports = assimilate;root.assimilate = module.exports;}(this));
