// Common variables
const doc = window.document;
const documentElement = doc.documentElement;
const slice = [].slice;

// Convert an array-like object to an array
const toArray = Array.from || ((obj) => slice.call(obj));

// Feature test for the browser's implementation
// of `matches`
const matches = [
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

// Export pseudos map for custom filters
export const pseudos = {};

/**
 * Does an element match a CSS selector string
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */
export function is(el, selector) {
    return el[matches](selector);
}

/**
 * Find a single element based on a CSS
 * selector string
 *
 * @param {String} selector
 * @param {Element|String} root
 * @return {Elementt}
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
 * @return {Elementt}
 * @api public
 */
export function query(selector, root = documentElement) {
    if (typeof root === 'string') {
        root = find(root);
    }
    selector.trim();
    return toArray(root.querySelectorAll(selector));
}

// Declare `sonic` namespace
const sonic = {is, find, query, pseudos};
// Export sonic
export default sonic;
