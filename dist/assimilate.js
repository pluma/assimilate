/*! assimilate 0.3.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
var slice = Array.prototype.slice;

function bind(fn, self) {
    var args = slice.call(arguments, 2);
    if (typeof Function.prototype.bind === 'function') {
        return Function.prototype.bind.apply(fn, [self].concat(args));
    }
    return function() {
        return fn.apply(self, args.concat(slice.call(arguments, 0)));
    };
}

function simpleCopy(target, name, source) {
    target[name] = source[name];
}

function properCopy(target, name, source) {
    var descriptor = Object.getOwnPropertyDescriptor(source, name);
    Object.defineProperty(target, name, descriptor);
}

function ownProperties(obj) {
    return Object.getOwnPropertyNames(obj);
}

function allKeys(obj) {
    var keys = [];
    for (var name in obj) {
        keys.push(name);
    }
    return keys;
}

function ownKeys(obj) {
    var keys = [];
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            keys.push(name);
        }
    }
    return keys;
}

function assimilateWithStrategy(target) {
    var strategy = this,
    sources = slice.call(arguments, 1),
    i, source, names, j, name;

    if (target === undefined || target === null) {
        target = {};
    }

    for (i = 0; i < sources.length; i++) {
        source = sources[i];
        names = strategy.keysFn(source);
        for (j = 0; j < names.length; j++) {
            name = names[j];
            strategy.copyFn(target, name, source);
        }
    }

    return target;
}

var strategies = {
    DEFAULT: {
        keysFn: ownKeys,
        copyFn: simpleCopy
    },
    PROPER: {
        keysFn: ownProperties,
        copyFn: properCopy
    },
    INHERITED: {
        keysFn: allKeys,
        copyFn: simpleCopy
    },
    DEEP: {
        keysFn: ownKeys,
        copyFn: function recursiveCopy(target, name, source) {
            var val = source[name];
            var old = target[name];
            if (typeof val === 'object' && typeof old === 'object') {
                assimilateWithStrategy.call(strategies.DEEP, old, val);
            } else {
                simpleCopy(target, name, source);
            }
        }
    },
    STRICT: {
        keysFn: ownKeys,
        copyFn: function strictCopy(target, name, source) {
            if (source[name] !== undefined) {
                simpleCopy(target, name, source);
            }
        }
    },
    FALLBACK: {
        keysFn: function fallbackCopy(target, name, source) {
            if (target[name] === undefined) {
                simpleCopy(target, name, source);
            }
        },
        copyFn: simpleCopy
    }
};

var assimilate = bind(assimilateWithStrategy, strategies.DEFAULT);
assimilate.strategies = strategies;
assimilate.withStrategy = function withStrategy(strategy) {
    if (typeof strategy === 'string') {
        strategy = strategies[strategy.toUpperCase()];
    }
    if (!strategy) {
        throw new Error('Unknwon or invalid strategy:' + strategy);
    }
    if (typeof strategy.copyFn !== 'function') {
        throw new Error('Strategy missing copy function:' + strategy);
    }
    if (typeof strategy.keysFn !== 'function') {
        throw new Error('Strategy missing keys function:' + strategy);
    }
    return bind(assimilateWithStrategy, strategy);
};

module.exports = assimilate;