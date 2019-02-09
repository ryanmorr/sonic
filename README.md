# sonic

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> A modern, context-aware, and extendable CSS selector engine built on top of `querySelectorAll`.

## Install

Download the [development](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.js) or [minified](http://github.com/ryanmorr/sonic/raw/master/dist/sonic.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/sonic
```

## Usage

Find a single element:

``` javascript
import { find } from '@ryanmorr/sonic';

// Returns the matching element or null if no match is found
const el = find('#container');
```

Query for multiple elements:

``` javascript
import { query } from '@ryanmorr/sonic';

// Returns an array of all matching elements
const elements = query('.items');
```

Check if an element matches a selector string:

``` javascript
import { is } from '@ryanmorr/sonic';

const isMatch = is(element, 'div.class[attr=value]');
```

Provide an element or selector string as an optional second argument as the root of the query:

``` javascript
const el = find('[attr]', element);
const elements = query(':first-child', '#header');
```

Use leading combinators:

``` javascript
const divs = query('> div');
const blocks = query('+ .block');
const checked = query('~ :checked');
```

## Extendable

Create custom pseudo-class selectors (must return a boolean):

``` javascript
import { find, query, pseudos } from '@ryanmorr/sonic';

pseudos.foo = (el) => {
    return el.hasAttribute('foo');
};

pseudos.bar = (el, value) => {
    return el.hasAttribute(value);
};

const el = find(':foo');
const elements = query(':bar(class)');
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
// Expected <em>Level 2</em>, but returns <em>Level 1</em>, doh!
document.querySelector('#container').querySelector('section em');
```

Apparently, this behavior is purported to be correct given how long it has endured. Sonic, on the other hand, abides by the principle of least surprise and gives you exactly what you expect.

``` javascript
// Returns <em>Level 2</em> as expected, hooray!
const elements = query('section em', '#container');
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/sonic
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fsonic.svg
[build-url]: https://travis-ci.org/ryanmorr/sonic
[build-image]: https://travis-ci.org/ryanmorr/sonic.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE