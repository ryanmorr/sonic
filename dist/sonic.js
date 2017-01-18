/*! sonic v0.2.2 | https://github.com/ryanmorr/sonic */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.matches = matches;
exports.find = find;
exports.query = query;
/**
 * Common variables
 */
var doc = window.document;
var documentElement = doc.documentElement;
var arrayFilter = [].filter;

/**
 * Parsing regular expressions
 */
var splitRe = /\s*(>|\+(?!\d)|~(?!=)|\s)\s*/;
var pseudoRe = /:([\w-]+)(?:\(([^)]*)\))?/g;
var groupRe = /\s*,\s*/;

/**
 * Feature test for the browser's implementation
 * of `matches`
 */
var matchesFn = ['matches', 'matchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector', 'oMatchesSelector', 'msMatchesSelector'].reduce(function (fn, name) {
    if (fn) {
        return fn;
    }
    return name in documentElement ? name : fn;
}, null);

/**
 * Map CSS selector combinators to a function
 * capable of finding the relative elements and
 * filtering them based on the provided token
 */
var combinators = {

    /**
     * Find all descendant elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {String} token.selector
     * @param {Array} token.filters
     * @param {Array} results
     * @return {Array}
     * @api private
     */
    ' ': function _(context, token, results) {
        return results.concat(arrayFilter.call(context.querySelectorAll(token.selector), function (el) {
            return filter(el, token.filters);
        }));
    },

    /**
     * Find all child elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {String} token.selector
     * @param {Array} token.filters
     * @param {Array} results
     * @return {Array}
     * @api private
     */
    '>': function _(context, token, results) {
        return results.concat(arrayFilter.call(context.querySelectorAll(token.selector), function (el) {
            return el.parentNode === context && filter(el, token.filters);
        }));
    },

    /**
     * Find all adjacent sibling elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {String} token.selector
     * @param {Array} token.filters
     * @param {Array} results
     * @return {Array}
     * @api private
     */
    '+': function _(context, token, results) {
        var el = context.nextElementSibling;
        if (el && matches(el, token.selector) && filter(el, token.filters)) {
            results.push(el);
        }
        return results;
    },

    /**
     * Find all general sibling elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {String} token.selector
     * @param {Array} token.filters
     * @param {Array} results
     * @return {Array}
     * @api private
     */
    '~': function _(context, token, results) {
        var el = context.nextElementSibling;
        while (el) {
            if (matches(el, token.selector) && filter(el, token.filters)) {
                results.push(el);
            }
            el = el.nextElementSibling;
        }
        return results;
    }
};

/**
 * Export pseudo-class map for custom filters
 */
var pseudos = exports.pseudos = Object.create(null);

/**
 * Test an element against the custom
 * pseudo-classes (if any) to determine if it
 * is a match
 *
 * @param {Element} el
 * @param {Array} filters
 * @return {Boolean}
 * @api private
 */
function filter(el, filters) {
    var i = filters.length;
    while (i--) {
        var _filter = filters[i];
        if (!pseudos[_filter.name](el, _filter.param)) {
            return false;
        }
    }
    return true;
}

/**
 * Convert a selector string into an
 * array of tokens
 *
 * @param {String} selectorString
 * @return {Array}
 * @api private
 */
function tokenize(selectorString) {
    return selectorString.split(splitRe).reduce(function (tokens, selector) {
        if (selector) {
            var _ret = function () {
                if (selector in combinators) {
                    tokens.push(selector);
                    return {
                        v: tokens
                    };
                }
                var filters = [];
                selector = selector.replace(pseudoRe, function (all, name, param) {
                    if (name in pseudos) {
                        filters.push({ name: name, param: param });
                        return '';
                    }
                    return all;
                });
                selector = selector === '' ? '*' : selector;
                tokens.push({ selector: selector, filters: filters });
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return tokens;
    }, []);
}

/**
 * Does an element match a CSS selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
function matches(el, selector) {
    return el[matchesFn](selector);
}

/**
 * Find a single element based on a CSS
 * selector string
 *
 * @param {String} selector
 * @param {Element|String} root (optional)
 * @return {Element|Null}
 * @api public
 */
function find(selector, root) {
    return query(selector, root)[0] || null;
}

/**
 * Query for all elements matching a
 * CSS selector string
 *
 * @param {String} selector
 * @param {Element|String} root (optional)
 * @return {Array}
 * @api public
 */
function query(selector) {
    var root = arguments.length <= 1 || arguments[1] === undefined ? doc : arguments[1];

    if (typeof root === 'string') {
        root = find(root);
    }
    var results = [];
    var groups = selector.trim().split(groupRe);
    while (groups.length) {
        var context = [root];
        var tokens = tokenize(groups.shift());

        var _loop = function _loop() {
            var token = tokens.shift(),
                combinator = combinators[' '];
            if (token in combinators) {
                combinator = combinators[token];
                token = tokens.shift();
            }
            context = context.reduce(function (nodes, el) {
                return combinator(el, token, nodes);
            }, []);
        };

        while (tokens.length && context.length) {
            _loop();
        }
        context.forEach(function (el) {
            if (results.indexOf(el) === -1) {
                results.push(el);
            }
        });
    }
    return results.sort(function (a, b) {
        return 3 - (a.compareDocumentPosition(b) & 6);
    });
}

/**
 * Declare and export `sonic` namespace
 */
var sonic = { matches: matches, find: find, query: query, pseudos: pseudos };
exports.default = sonic;

},{}]},{},[1])(1)
});

