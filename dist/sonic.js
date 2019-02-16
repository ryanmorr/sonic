/*! @ryanmorr/sonic v1.0.1 | https://github.com/ryanmorr/sonic */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sonic = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/*! @ryanmorr/css-selector-parser v0.1.0 | https://github.com/ryanmorr/css-selector-parser */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).parse=e()}}(function(){return function o(i,s,f){function a(t,e){if(!s[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var u=s[t]={exports:{}};i[t][0].call(u.exports,function(e){return a(i[t][1][e]||e)},u,u.exports,o,i,s,f)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<f.length;e++)a(f[e]);return a}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(t){if((t=t.trim())in F)return F[t];var e,r=[],n=[],u=!1;function o(){var e=t.match(m)[0];return i(e.length),a(e)}function i(e){t=t.substring(e)}function s(e){for(;f(t.charAt(e));)e++;i(e)}function f(e){return" "===e||"\n"===e||"\t"===e||"\f"===e||"\r"===e}function a(e){return e.replace(g,function(e,t,r){return t?String.fromCharCode(parseInt(t,16)):r})}function l(){e={attributes:[],pseudos:[]}}l();for(;""!==t;){var p=t.charAt(0);if(f(p))u=!0,s(1);else if(">"===p||"<"===p||"~"===p||"+"===p)(e.nodeName||0<e.attributes.length||0<e.pseudos.length)&&n.push(e),n.push(p),l(),u=!1,s(1);else if(","===p)n.push(e),r.push(n),l(),u=!(n=[]),s(1);else if(u&&(n.push(e),n.push(" "),l(),u=!1),"*"===p)i(1),e.nodeName="*";else if("#"===p)i(1),e.attributes.push({name:"id",operator:"=",value:o(),ignoreCase:!1});else if("."===p)i(1),e.attributes.push({name:"class",operator:"~=",value:o(),ignoreCase:!1});else if("["===p){var c=t.match(b);i(c[0].length);var d=a(c[1]).toLowerCase();e.attributes.push({name:d,operator:c[2]||"",value:a(c[4]||c[5]||""),ignoreCase:!!c[6]})}else if(":"===p){var h=t.match(w);i(h[0].length);var v=a(h[1]).toLowerCase();e.pseudos.push({name:v,value:a(h[3]||"")})}else m.test(t)&&(e.nodeName=o().toLowerCase())}return n.push(e),r.push(n),F[t]=r};var F=Object.create(null),m=/^(?:\\.|[\w\-\u00c0-\uFFFF])+/,g=/\\(?:([0-9a-f]{1,6} ?)|(.))/gi,w=/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/,b=/^\[((?:\\.|[\w\u00c0-\uFFFF\-])+)\s*(?:(\S?=)\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00c0-\uFFFF\-])*)|)|)\s*(i)?\]/;t.exports=r.default},{}]},{},[1])(1)});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = is;
exports.find = find;
exports.query = query;
exports.pseudos = void 0;

var _cssSelectorParser = _interopRequireDefault(require("@ryanmorr/css-selector-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = window.document;
var documentElement = doc.documentElement;
var arrayFilter = [].filter;
var matchesFn = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].reduce(function (fn, name) {
  if (fn) {
    return fn;
  }

  return name in documentElement ? name : fn;
}, null);
var combinators = {
  ' ': function _(context, token, results) {
    return results.concat(arrayFilter.call(context.querySelectorAll(token.selector), function (el) {
      return filter(el, token.filters);
    }));
  },
  '>': function _(context, token, results) {
    return results.concat(arrayFilter.call(context.querySelectorAll(token.selector), function (el) {
      return el.parentNode === context && filter(el, token.filters);
    }));
  },
  '+': function _(context, token, results) {
    var el = context.nextElementSibling;

    if (el && matches(el, token.selector) && filter(el, token.filters)) {
      results.push(el);
    }

    return results;
  },
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
var pseudos = Object.create(null);
exports.pseudos = pseudos;

function matches(el, selector) {
  return el[matchesFn](selector);
}

function filter(el, filters) {
  return filters.every(function (_ref) {
    var name = _ref.name,
        value = _ref.value;
    return pseudos[name](el, value);
  });
}

function tokenize(selector) {
  return (0, _cssSelectorParser.default)(selector).map(function (tokens) {
    return tokens.map(function (token) {
      if (typeof token === 'string') {
        return token;
      }

      var selector = [];
      var filters = [];

      if (token.nodeName) {
        selector.push(token.nodeName);
      }

      token.attributes.forEach(function (_ref2) {
        var name = _ref2.name,
            value = _ref2.value,
            operator = _ref2.operator,
            ignoreCase = _ref2.ignoreCase;

        if (name === 'id') {
          selector.push('#', value);
        } else if (name === 'class') {
          selector.push('.', value);
        } else {
          selector.push('[', name);

          if (operator !== '') {
            selector.push(operator, '"', value, '"');

            if (ignoreCase) {
              selector.push(' i');
            }
          }

          selector.push(']');
        }
      });
      token.pseudos.forEach(function (_ref3) {
        var name = _ref3.name,
            value = _ref3.value;

        if (name in pseudos) {
          filters.push({
            name: name,
            value: value
          });
        } else {
          selector.push(':', name);

          if (value !== '') {
            selector.push('(', value, ')');
          }
        }
      });
      return {
        filters: filters,
        selector: selector.length === 0 ? '*' : selector.join('')
      };
    });
  });
}

function is(el, selector) {
  var token = tokenize(selector)[0][0];
  return matches(el, token.selector) && filter(el, token.filters);
}

function find(selector, root) {
  return query(selector, root)[0] || null;
}

function query(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : doc;

  if (typeof root === 'string') {
    root = find(root);
  }

  root = [root];
  return tokenize(selector).reduce(function (results, tokens) {
    var context = root;
    var i = 0;
    var len = tokens.length;

    var _loop = function _loop() {
      var token = tokens[i++],
          combinator = combinators[' '];

      if (token in combinators) {
        combinator = combinators[token];
        token = tokens[i++];
      }

      context = context.reduce(function (nodes, el) {
        return combinator(el, token, nodes);
      }, []);
    };

    while (i < len) {
      _loop();
    }

    context.forEach(function (el) {
      if (!results.includes(el)) {
        results.push(el);
      }
    });
    return results;
  }, []).sort(function (a, b) {
    return 3 - (a.compareDocumentPosition(b) & 6);
  });
}

},{"@ryanmorr/css-selector-parser":1}]},{},[2])(2)
});

