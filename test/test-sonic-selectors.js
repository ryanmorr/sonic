/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import { matches, find, query } from '../src/sonic';

document.body.innerHTML = `
    <section id="section">
        <div id="unique" class="foo bar" baz="aaa" qux="some random text" lang="en-us"></div>
        <div foo></div>
        <div foo="bar"></div>
        <div></div>
        <div></div>
        <div>
            <article>
                <div></div>
                <div foo></div>
                <div foo="bar"></div>
                <div></div>
                <div>
                    <i></i>
                    <i aaa></i>
                    <i bbb></i>
                    <em ccc></em>
                </div>
                <div class="foo"></div>
            </article>
        </div>
        <div class="foo" lang="en-us"></div>
        <div></div>
        <div foo></div>
    </section>
    <section id="section2">
        <h1>Top Heading</h1>
        <section>
            <h1>Sub Heading</h1>
        </section>
        <div>
            <ul class="list">
                <li class="list-item"></li>
                <li class="list-item"></li>
                <li class="list-item"></li>
                <li class="list-item"></li>
                <li class="list-item"></li>
            </ul>
        </div>
        <div class="bar" qux="some random text"></div>
        <span qux="some random text"></span>
    </section>
    <section id="section3">
        <form>
            <input type="checkbox" checked />
            <input type="checkbox" checked />
            <input type="checkbox" />
            <input type="text" disabled />
        </form>
    </section>
`;

describe('sonic - matches', () => {
    it('should return true for an element with a matching selector string', () => {
        const div = document.querySelector('#unique');
        expect(matches(div, 'div')).to.equal(true);
        expect(matches(div, '#unique')).to.equal(true);
        expect(matches(div, '.foo')).to.equal(true);
        expect(matches(div, '.bar')).to.equal(true);
        expect(matches(div, '.foo.bar')).to.equal(true);
        expect(matches(div, '[baz]')).to.equal(true);
        expect(matches(div, '[baz=aaa]')).to.equal(true);
        expect(matches(div, '[baz="aaa"]')).to.equal(true);
        expect(matches(div, '[baz][qux][lang]')).to.equal(true);
        expect(matches(div, '[qux~="random"]')).to.equal(true);
        expect(matches(div, '[qux*="rand"]')).to.equal(true);
        expect(matches(div, '[qux^="some"]')).to.equal(true);
        expect(matches(div, '[qux$="text"]')).to.equal(true);
        expect(matches(div, '[lang|="en"]')).to.equal(true);
        expect(matches(div, 'div#unique.foo.bar[baz=aaa][qux="some random text"][lang="en-us"]')).to.equal(true);
    });
});

describe('sonic - find/query', () => {
    function batchCheckSelectors(items) {
        items.forEach((item) => {
            const context = item.context || document;
            const expected = context.querySelectorAll(item.selector);
            const element = find(item.selector, context);
            const elements = query(item.selector, context);
            checkElements(expected, element, elements, item.length);
        });
    }

    function checkElements(expected, element, elements, expectedLength) {
        expect(elements).to.have.lengthOf(expectedLength);
        expect(element).to.equal(expected[0]);
        elements.forEach((el, i) => {
            expect(el).to.equal(expected[i]);
        });
    }

    it('should support tag selectors', () => {
        batchCheckSelectors([
            {selector: 'section', length: 4},
            {selector: 'div', length: 17},
            {selector: 'i', length: 3},
            {selector: 'li', length: 5},
            {selector: 'h1', length: 2},
            {selector: 'div', context: document.querySelector('#section'), length: 15},
            {selector: 'div', context: document.querySelector('article'), length: 6}
        ]);
    });

    it('should support id selectors', () => {
        batchCheckSelectors([
            {selector: '#section', length: 1},
            {selector: '#section2', length: 1},
            {selector: '#section', context: document.querySelector('#section'), length: 0}
        ]);
    });

    it('should support class selectors', () => {
        batchCheckSelectors([
            {selector: '.list-item', length: 5},
            {selector: '.foo', length: 3},
            {selector: '.bar', length: 2},
            {selector: '.foo.bar', length: 1},
            {selector: '.bar', context: document.querySelector('#section'), length: 1}
        ]);
    });

    it('should support attribute selectors', () => {
        batchCheckSelectors([
            {selector: '[foo]', length: 5},
            {selector: '[foo=bar]', length: 2},
            {selector: '[baz][qux][lang]', length: 1},
            {selector: '[qux~="random"]', length: 3},
            {selector: '[qux*="rand"]', length: 3},
            {selector: '[lang|="en"]', length: 2},
            {selector: '[qux^="some"]', length: 3},
            {selector: '[qux$="text"]', context: document.querySelector('#section2'), length: 2}
        ]);
    });

    it('should support pseudo-class selectors', () => {
        batchCheckSelectors([
            {selector: ':first-child', context: document.body, length: 11},
            {selector: ':last-child', context: document.body, length: 11},
            {selector: ':only-child', context: document.body, length: 4},
            {selector: ':first-of-type', context: document.querySelector('#section'), length: 5},
            {selector: ':last-of-type', context: document.querySelector('#section'), length: 5},
            {selector: ':only-of-type', context: document.querySelector('#section'), length: 2},
            {selector: ':not([foo])', context: document.querySelector('#section'), length: 15},
            {selector: ':checked', length: 2},
            {selector: ':disabled', length: 1},
            {selector: ':enabled', length: 3},
            {selector: ':nth-child(4n+1)', context: document.querySelector('#section'), length: 7},
            {selector: ':nth-last-child(-n+3)', context: document.querySelector('#section'), length: 10},
            {selector: ':nth-last-of-type(2)', context: document.querySelector('#section'), length: 3},
            {selector: ':nth-of-type(2n)', context: document.querySelector('#section'), length: 8}
        ]);
    });

    it('should support custom pseudo-class selectors', () => {

    });

    it('should support decendant combinator selectors', () => {

    });

    it('should support starting decendant combinator selectors', () => {

    });

    it('should support child combinator selectors', () => {

    });

    it('should support starting child combinator selectors', () => {

    });

    it('should support adjacent sibling combinator selectors', () => {

    });

    it('should support starting adjacent sibling combinator selectors', () => {

    });

    it('should support general sibling combinator selectors', () => {

    });

    it('should support starting general sibling combinator selectors', () => {

    });

    it('should support multiple selectors', () => {

    });

    it('should support complex selectors', () => {

    });

    it('should be context-aware', () => {

    });

    it('should support a contextual element as an optional second argument', () => {

    });

    it('should support a selector string for a contextual element as an optional second argument', () => {

    });

    it('should not return duplicate elements', () => {

    });

    it('should return elements in the order they appear in the document', () => {

    });
});
