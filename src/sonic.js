/**
 * Common variables
 */
const doc = window.document;
const documentElement = doc.documentElement;

/**
 * Parsing regular expressions
 */
const splitRe = /\s*([>+]|~(?!=)|\s)\s*/;
const pseudoRe = /:([\w-]+)(?:\(([^)]*)\))?/g;

/**
 * Feature test for the browser's implementation
 * of `matches`
 */
const matchesFn = [
    'matches',
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'oMatchesSelector',
    'msMatchesSelector'
].reduce((fn, name) => {
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
const combinators = {

    /**
     * Find all descendant elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {Array} results
     * @api private
     */
    ' ': function descendantCombinator(context, token, results) {
        const elements = context.querySelectorAll(token.selector);
        for (let i = 0, len = elements.length, el; i < len; i++) {
            el = elements[i];
            if (filter(el, token.filters)) {
                results.push(el);
            }
        }
    },

    /**
     * Find all child elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {Array} results
     * @api private
     */
    '>': function childCombinator(context, token, results) {
        const elements = context.querySelectorAll(token.selector);
        for (let i = 0, len = elements.length, el; i < len; i++) {
            el = elements[i];
            if (el.parentNode === context && filter(el, token.filters)) {
                results.push(el);
            }
        }
    },

    /**
     * Find all adjacent sibling elements of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {Array} results
     * @api private
     */
    '+': function adjacentSiblingCombinator(context, token, results) {
        const el = context.nextElementSibling;
        if (el && matches(el, token.selector) && filter(el, token.filters)) {
            results.push(el);
        }
    },

    /**
     * Find all general sibling element of the
     * context matching the token
     *
     * @param {Element} context
     * @param {Object} token
     * @param {Array} results
     * @api private
     */
    '~': function generalSiblingCombinator(context, token, results) {
        let el = context.nextElementSibling;
        while (el) {
            if (matches(el, token.selector) && filter(el, token.filters)) {
                results.push(el);
            }
            el = el.nextElementSibling;
        }
    }
};

/**
 * Export pseudo-class map for custom filters
 */
export const pseudos = {};

/**
 * Run all the custom filters against an
 * element to determine if it is a match
 *
 * @param {Element} el
 * @param {Array} filters
 * @return {Boolean}
 * @api private
 */
function filter(el, filters) {
    let i = filters.length;
    while (i--) {
        const filter = filters[i];
        if (!pseudos[filter.name](el, filter.param)) {
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
    return selectorString.split(splitRe).reduce((tokens, selector) => {
        if (selector) {
            if (selector in combinators) {
                tokens.push(selector);
                return tokens;
            }
            const filters = [];
            selector = selector.replace(pseudoRe, (all, name, param) => {
                if (name in pseudos) {
                    filters.push({name, param});
                    return '';
                }
                return all;
            });
            tokens.push({selector, filters});
        }
        return tokens;
    }, []);
}

/**
 * Convert a selector string into an
 * array of tokens
 *
 * @param {Array} nodes
 * @param {String} combinator
 * @param {Object} token
 * @return {Array}
 * @api private
 */
function process(nodes, combinator, token) {
    const results = [];
    combinator = combinators[combinator];
    for (let i = 0, len = nodes.length; i < len; i++) {
        combinator(nodes[i], token, results);
    }
    return results;
}

/**
 * Does an element match a CSS selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
export function matches(el, selector) {
    return el[matchesFn](selector);
}

/**
 * Find a single element based on a CSS
 * selector string
 *
 * @param {String} selector
 * @param {Element|String} root
 * @return {Element}
 * @api public
 */
export function find(selector, root) {
    return query(selector, root)[0];
}

/**
 * Query for all elements matching a
 * CSS selector string
 *
 * @param {String} selector
 * @param {Element|String} root
 * @return {Element}
 * @api public
 */
export function query(selector, root = doc) {
    if (typeof root === 'string') {
        root = find(root);
    }
    selector.trim();
    let context = [root];
    const tokens = tokenize(selector);
    while (tokens.length && context.length) {
        const token = tokens.shift();
        if (token in combinators) {
            context = process(context, token, tokens.shift());
        } else {
            context = process(context, ' ', token);
        }
    }
    return context;
}

/**
 * Declare and export `sonic` namespace
 */
const sonic = {matches, find, query, pseudos};
export default sonic;
