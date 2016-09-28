# sonic

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![Dependencies][dependencies-image]][project-url]
[![License][license-image]][license-url]
[![File Size][file-size-image]][project-url]

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

Provide an element or selector string as an optional second argument as the root of the query:

``` javascript
sonic.find('[attr]', element);
sonic.query(':first-child', '#header');
```

Use leading combinators:

``` javascript
sonic.query('> div');
sonic.query('+ .block');
sonic.query('~ :checked');
```

## Extendable

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

Apparently, this behavior is purported to be correct given how long it has endured. Sonic, on the other hand, abides by the principle of least surprise and gives you exactly what you expect.

``` javascript
// returns <em>Level 2</em> as expected, hooray!
sonic.query('section em', '#container');
```

## Installation

Sonic is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.js) or [minified](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/sonic

bower install ryanmorr/sonic
```

## Tests

Run unit tests by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/sonic
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fsonic.svg
[build-url]: https://travis-ci.org/ryanmorr/sonic
[build-image]: https://travis-ci.org/ryanmorr/sonic.svg
[dependencies-image]: https://david-dm.org/ryanmorr/sonic.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE
[file-size-image]: https://badge-size.herokuapp.com/ryanmorr/sonic/master/dist/sonic.min.js.svg?color=blue&label=file%20size