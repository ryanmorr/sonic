/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import { is, find, query } from '../src/sonic';

document.body.innerHTML = `
    <section id="section">
        <div foo></div>
        <div id="unique" class="foo bar" baz="aaa" qux="some random text" lang="en-us"></div>
        <div foo></div>
        <div></div>
        <div></div>
        <div>
            <article>
                <div></div>
                <div foo></div>
                <div foo="bar"></div>
                <div bar="baz"></div>
                <div>
                    <i></i>
                    <i aaa></i>
                    <i bbb></i>
                    <em ccc></em>
                </div>
                <div></div>
            </article>
        </div>
        <div lang="en-us"></div>
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
        <div qux="some random text"></div>
        <span qux="some random text"></span>
    </section>
`;

describe('sonic - is', () => {
    it('should return true for an element with a matching selector string', () => {
        const div = document.querySelector('#unique');
        expect(is(div, 'div')).to.equal(true);
        expect(is(div, '#unique')).to.equal(true);
        expect(is(div, '.foo')).to.equal(true);
        expect(is(div, '.bar')).to.equal(true);
        expect(is(div, '.foo.bar')).to.equal(true);
        expect(is(div, '[baz]')).to.equal(true);
        expect(is(div, '[baz=aaa]')).to.equal(true);
        expect(is(div, '[baz="aaa"]')).to.equal(true);
        expect(is(div, '[baz][qux][lang]')).to.equal(true);
        expect(is(div, '[qux~="random"]')).to.equal(true);
        expect(is(div, '[qux*="rand"]')).to.equal(true);
        expect(is(div, '[qux^="some"]')).to.equal(true);
        expect(is(div, '[qux$="text"]')).to.equal(true);
        expect(is(div, '[lang|="en"]')).to.equal(true);
        expect(is(div, 'div#unique.foo.bar[baz=aaa][qux="some random text"][lang="en-us"]')).to.equal(true);
    });
});

describe('sonic - find/query', () => {
    function checkElements(expected, element, elements, expectedLength) {
        expect(elements).to.have.lengthOf(expectedLength);
        expect(element).to.equal(expected[0]);
        elements.forEach((el, i) => {
            expect(el).to.equal(expected[i]);
        });
    }

    it('should support tag selectors', () => {
        const expected = document.querySelectorAll('section');
        const element = find('section');
        const elements = query('section');
        checkElements(expected, element, elements, 3);
    });

    it('should support id selectors', () => {
        const expected = document.querySelectorAll('#section');
        const element = find('#section');
        const elements = query('#section');
        checkElements(expected, element, elements, 1);
    });

    it('should support class selectors', () => {
        const expected = document.querySelectorAll('.list-item');
        const element = find('.list-item');
        const elements = query('.list-item');
        checkElements(expected, element, elements, 5);
    });

    it('should support attributes selectors', () => {

    });

    it('should support pseudo-class selectors', () => {

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
