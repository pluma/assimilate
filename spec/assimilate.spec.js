/*global describe, it */
var expect = require('expect.js'),
    assimilate = require('../');

describe('assimilate(target, undefined)', function() {
    it('does not modify the target', function() {
        var target = {a: 1};
        expect(assimilate(target, undefined)).to.equal(target);
    });
});

describe('assimilate(undefined, source)', function() {
    it('returns a new object', function() {
        var src = {a: 1},
            result = assimilate(undefined, src);
        expect(result).to.eql(src);
        expect(result).not.to.be(src);
    });
});

describe('assimilate(target, null)', function() {
    it('does not modify the target', function() {
        var target = {a: 1};
        expect(assimilate(target, null)).to.equal(target);
    });
});

describe('assimilate(null, source)', function() {
    it('returns a new object', function() {
        var src = {a: 1},
            result = assimilate(null, src);
        expect(result).to.eql(src);
        expect(result).not.to.be(src);
    });
});

describe('assimilate(target, source)', function() {
    it('returns the target object', function() {
        var target = {a: 1};
        expect(assimilate(target)).to.equal(target);
    });
    it('adds all missing properties', function() {
        var target = {a: 1},
            src = {b: 2, c: 3};
        expect(assimilate(target, src)).to.eql({a: 1, b: 2, c: 3});
    });
    it('replaces existing properties', function() {
        var target = {a: 1},
            src = {a: 3, b: 2};
        expect(assimilate(target, src)).to.eql({a: 3, b: 2});
    });
});

describe('assimilate(target, source1, source2)', function() {
    it('copies from all sources', function() {
        var target = {a: 1},
            src1 = {b: 2},
            src2 = {c: 3};
        expect(assimilate(target, src1, src2)).to.eql({a: 1, b: 2, c: 3});
    });
    it('does not modify the sources', function() {
        var target = {a: 1},
            src1 = {b: 2},
            src2 = {c: 3};
        assimilate(target, src1, src2);
        expect(src1).to.eql({b: 2});
        expect(src2).to.eql({c: 3});
    });
});

describe('assimilate(boolean)', function() {
    it('returns the boolean as its target object', function() {
        expect(assimilate(true)).to.equal(true);
    });
});

describe('assimilate(true, target, source)', function() {
    it('returns the target object', function() {
        var target = {a: {b: 2}},
            src = {a: {c: 3}};
        expect(assimilate(true, target, src)).to.equal(target);
    });
    it('merges existing properties recursively', function() {
        var target = {a: {b: {c: 1, d: 2}}},
            src = {a: {b: {c: 0, e: 3}}};
        expect(assimilate(true, target, src)).to.eql({
            a: {b: {c: 0, d: 2, e: 3}}
        });
    });
});