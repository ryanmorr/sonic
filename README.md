# sonic

> A modern, context-aware, and extendable CSS selector engine built on top of `querySelectorAll`.

## Usage

Find a single element:

``` javascript
sonic.find('#container');
```

Query for multiple elements:

``` javascript
sonic.query('.items');
```

Check if an element matches a selector string:

``` javascript
sonic.matches(element, 'div.class[attr=value]');
```

Provide an element or selector string as an optional second argument to use as the root of the query instead of the default (`document`):

``` javascript
sonic.query('[attr]', element);

sonic.query(':first-child', '#header');
```

Use leading combinators:

``` javascript
sonic.query('> div');
```

Create custom pseudo-class selectors (must return a boolean):

``` javascript
sonic.pseudos.foo = (el) => {
    return el.hasAttribute('foo');
};

sonic.pseudos.bar = (el, value) => {
    return el.hasAttribute(value);
};

sonic.query(':foo');
sonic.query(':bar(class)');
```

## Context-Aware

Sonic addresses the long-standing flaw in `querySelector` and `querySelectorAll` that sees element-rooted queries search relative to the document and not the element itself:

``` html
<section id="container">
    <em>Level 1</em>
    <section>
        <em>Level 2</em>
    </section>
</section>
```

``` javascript
// expected <em>Level 2</em>, but returns <em>Level 1</em>, doh!
document.querySelector('#container').querySelector('section em');
```

Apparently, this behavior is purported to be correct given how long it has endured. Sonic, on the other hand, abides by the principle of least surprise, and gives you exactly what you expect:

``` javascript
// returns <em>Level 2</em> as expected, hooray!
sonic.query('section em', '#container');
```

## API

### find

Finds a single element matching the provided selector string.

###### Arguments
* `selector` (String) The CSS selector string to match elements against.
* `root` (String/Element) The contextual element of the search (optional, `document` is default).

###### Returns
(Element/Null) The first element matching the selector string or null if none is found.

### query

Find all the elements matching the provided selector string.

###### Arguments
* `selector` (String) The CSS selector string to match elements against.
* `root` (String/Element) The contextual element of the search (optional, `document` is default).

###### Returns
(Array) An array of all elements matching the selector string in document order.

### matches

Check if an element matches the provided selector string.

###### Arguments
* `element` (Element) The DOM element to match the selector string against.
* `selector` (String) The CSS selector string to match the element against.

###### Returns
(Boolean) True if the element matches the selector string, false otherwise.

## Installation

Sonic is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.js) or [minified](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/sonic

bower install ryanmorr/sonic
```

## Tests

Test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
