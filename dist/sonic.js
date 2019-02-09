/*! @ryanmorr/sonic v1.0.0 | https://github.com/ryanmorr/sonic */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sonic = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = is;
exports.find = find;
exports.query = query;
exports.pseudos = void 0;

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

var matchesFn = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].reduce(function (fn, name) {
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

var pseudos = Object.create(null);
/**
 * Does an element match a CSS selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api private
 */

exports.pseudos = pseudos;

function matches(el, selector) {
  return el[matchesFn](selector);
}
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
 * Convert a simple selector into a token
 *
 * @param {String} selector
 * @return {Object}
 * @api private
 */


function getToken(selector) {
  var filters = [];
  selector = selector.replace(pseudoRe, function (all, name, param) {
    if (name in pseudos) {
      filters.push({
        name: name,
        param: param
      });
      return '';
    }

    return all;
  });
  selector = selector === '' ? '*' : selector;
  return {
    selector: selector,
    filters: filters
  };
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
      if (selector in combinators) {
        tokens.push(selector);
        return tokens;
      }

      tokens.push(getToken(selector));
    }

    return tokens;
  }, []);
}
/**
 * Does an element match a CSS selector string
 * including custom pseudo-classes
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */


function is(el, selector) {
  var token = getToken(selector);
  return matches(el, token.selector) && filter(el, token.filters);
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
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;

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

},{}]},{},[1])(1)
});

