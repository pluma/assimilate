/*! assimilate 0.2.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
var slice = Array.prototype.slice;

function assimilateWithStrategy(strategy, copyInherited, target) {
    var sources = slice.call(arguments, 3),
        i, source, key;

    if (target === undefined || target === null) {
        target = {};
    }

    for (i = 0; i < sources.length; i++) {
        source = sources[i];
        if (source === undefined || source === null) continue;
        for (key in source) {
            if (copyInherited || source.hasOwnProperty(key)) {
                strategy(target, source, key, copyInherited);
            }
        }
    }

    return target;
}

function assimilate() {
    var args = slice.call(arguments, 0);
    return assimilateWithStrategy.apply(
        this, [assimilate.strategies.DEFAULT, false].concat(args)
    );
}

assimilate.withStrategy = function(strategy, copyInherited) {
    if (arguments.length === 1 && typeof strategy === 'boolean') {
        copyInherited = strategy;
        strategy = 'default';
    }
    if (typeof strategy === 'string') {
        strategy = strategy.toUpperCase();
        if (typeof assimilate.strategies[strategy] === 'function') {
            strategy = assimilate.strategies[strategy];
        }
    }
    if (typeof strategy !== 'function') {
        throw new Error('Unknown strategy or not a function: ' + strategy);
    }
    return function() {
        var args = slice.call(arguments, 0);
        return assimilateWithStrategy.apply(
            this, [strategy, !!copyInherited].concat(args)
        );
    };
};

assimilate.strategies = {
    DEFAULT: function(target, source, key) {
        target[key] = source[key];
    },
    DEEP: function(target, source, key, copyInherited) {
        var newValue = source[key];
        var oldValue = target[key];
        if (
            target.hasOwnProperty(key) &&
            typeof newValue === 'object' &&
            typeof oldValue === 'object'
        ) {
            assimilateWithStrategy(
                assimilate.strategies.DEEP, copyInherited, oldValue, newValue
            );
        } else {
            target[key] = newValue;
        }
    },
    STRICT: function(target, source, key) {
        var value = source[key];
        if (value !== undefined) {
            target[key] = value;
        }
    },
    FALLBACK: function(target, source, key) {
        var oldValue = target[key];
        if (oldValue === undefined) {
            target[key] = source[key];
        }
    }
};

module.exports = assimilate;