/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import { body, group1, group2, group3 } from './html';
import sonic, { matches, find, query, pseudos } from '../src/sonic';

describe('sonic', () => {
    it('should support importing of individual methods/properties (matches, find, query, pseudos)', () => {
        expect(matches).to.be.a('function');
        expect(find).to.be.a('function');
        expect(query).to.be.a('function');
        expect(pseudos).to.be.an('object');
        expect(pseudos).to.be.empty;
    });

    it('should support importing of sonic namespace', () => {
        expect(sonic.matches).to.be.a('function');
        expect(sonic.find).to.be.a('function');
        expect(sonic.query).to.be.a('function');
        expect(sonic.pseudos).to.be.an('object');
        expect(sonic.matches).to.equal(matches);
        expect(sonic.find).to.equal(find);
        expect(sonic.query).to.equal(query);
        expect(sonic.pseudos).to.equal(pseudos);
    });

    describe('matches', () => {
        it('should return true for an element with a matching selector string', () => {
            const element = document.querySelector('#element-1');
            const selectors = [
                'div',
                '#element-1',
                '.class1',
                '.class2',
                '.class1.class2.class3',
                '[attr]',
                '[attr=value]',
                '[attr="value"]',
                '[attr][attr2][lang]',
                '[attr2~="random"]',
                '[attr2*="rand"]',
                '[attr2^="some"]',
                '[attr2$="text"]',
                '[lang|="en"]',
                ':first-child',
                'div#element-1.class1.class2.class3[attr=value][attr2="some random text"][lang="en-us"]'
            ];
            selectors.forEach((selector) => expect(matches(element, selector)).to.equal(true));
        });
    });

    describe('find/query', () => {
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
            expect(element).to.equal(expected[0] || null);
            elements.forEach((el, i) => {
                expect(el).to.equal(expected[i]);
            });
        }

        it('should support tag selectors', () => {
            batchCheckSelectors([
                {selector: 'section', length: 4},
                {selector: 'div', context: group1, length: 6}
            ]);
        });

        it('should support id selectors', () => {
            batchCheckSelectors([
                {selector: '#group-1', length: 1},
                {selector: '#element-1', length: 1},
                {selector: '#group-2', length: 1},
                {selector: '#group-1', context: group1, length: 0}
            ]);
        });

        it('should support class selectors', () => {
            batchCheckSelectors([
                {selector: '.class1', length: 3},
                {selector: '.class1.class2', length: 3},
                {selector: '.class1.class2.class3', length: 1},
                {selector: '.list-item', length: 5},
                {selector: '.class1.class2', context: group1, length: 2}
            ]);
        });

        describe('attribute selectors', () => {
            it('should support [attr]', () => {
                batchCheckSelectors([
                    {selector: '[foo]', length: 9},
                    {selector: '[attr][attr2]', length: 2},
                    {selector: '[attr][attr2][lang]', length: 1},
                    {selector: '[attr2]', context: group2, length: 2}
                ]);
            });

            it('should support [attr=value]', () => {
                batchCheckSelectors([
                    {selector: '[attr=value]', length: 2},
                    {selector: '[attr="value"]', length: 2},
                    {selector: "[attr='value']", length: 2},
                    {selector: '[attr=\'value\']', length: 2},
                    {selector: '[attr=value]', context: group2, length: 1}
                ]);
            });

            it('should support [attr~=value]', () => {
                batchCheckSelectors([
                    {selector: '[attr2~="random"]', length: 3},
                    {selector: '[attr2~="random"]', context: group2, length: 2}
                ]);
            });

            it('should support [attr|=value]', () => {
                batchCheckSelectors([
                    {selector: '[lang|="en"]', length: 2},
                    {selector: '[lang|="en"]', context: group2, length: 0}
                ]);
            });

            it('should support [attr^=value]', () => {
                batchCheckSelectors([
                    {selector: '[attr2^="some"]', length: 3},
                    {selector: '[attr2^="some"]', context: group2, length: 2}
                ]);
            });

            it('should support [attr$=value]', () => {
                batchCheckSelectors([
                    {selector: '[attr2$="text"]', length: 3},
                    {selector: '[attr2$="text"]', context: group2, length: 2}
                ]);
            });

            it('should support [attr*=value]', () => {
                batchCheckSelectors([
                    {selector: '[attr2*="rand"]', length: 3},
                    {selector: '[attr2*="rand"]', context: group2, length: 2}
                ]);
            });
        });

        describe('pseudo-class selectors', () => {
            it('should support :first-child', () => {
                batchCheckSelectors([
                    {selector: ':first-child', context: body, length: 9},
                    {selector: ':first-child', context: group1, length: 3}
                ]);
            });

            it('should support :last-child', () => {
                batchCheckSelectors([
                    {selector: ':last-child', context: body, length: 9},
                    {selector: ':last-child', context: group1, length: 3}
                ]);
            });

            it('should support :only-child', () => {
                batchCheckSelectors([
                    {selector: ':only-child', context: body, length: 2},
                    {selector: ':only-child', context: group2, length: 1}
                ]);
            });

            it('should support :first-of-type', () => {
                batchCheckSelectors([
                    {selector: ':first-of-type', context: body, length: 16},
                    {selector: ':first-of-type', context: group3, length: 2}
                ]);
            });

            it('should support :last-of-type', () => {
                batchCheckSelectors([
                    {selector: ':last-of-type', context: body, length: 16},
                    {selector: ':last-of-type', context: group1, length: 6}
                ]);
            });

            it('should support :only-of-type', () => {
                batchCheckSelectors([
                    {selector: ':only-of-type', context: body, length: 8},
                    {selector: ':only-of-type', context: group2, length: 5}
                ]);
            });

            it('should support :checked', () => {
                batchCheckSelectors([
                    {selector: ':checked', length: 2},
                    {selector: ':checked', context: group2, length: 0}
                ]);
            });

            it('should support :disabled', () => {
                batchCheckSelectors([
                    {selector: ':disabled', length: 1},
                    {selector: ':disabled', context: group1, length: 0}
                ]);
            });

            it('should support :enabled', () => {
                batchCheckSelectors([
                    {selector: ':enabled', length: 3},
                    {selector: ':enabled', context: group2, length: 0}
                ]);
            });

            it('should support :not()', () => {
                batchCheckSelectors([
                    {selector: ':not([foo])', context: body, length: 26},
                    {selector: ':not([foo])', context: group2, length: 12}
                ]);
            });

            it('should support :nth-child()', () => {
                batchCheckSelectors([
                    {selector: ':nth-child(4n+1)', context: group1, length: 4}
                ]);
            });

            it('should support :nth-last-child()', () => {
                batchCheckSelectors([
                    {selector: ':nth-last-child(-n+3)', context: group1, length: 9}
                ]);
            });

            it('should support :nth-last-of-type()', () => {
                batchCheckSelectors([
                    {selector: ':nth-last-of-type(2)', context: group1, length: 4}
                ]);
            });

            it('should support :nth-of-type()', () => {
                batchCheckSelectors([
                    {selector: ':nth-of-type(2n)', context: group1, length: 6}
                ]);
            });

            it('should support custom pseudo-class selectors', () => {

            });
        });

        describe('combinator selectors', () => {
            it('should support decendant combinator (+) selectors', () => {

            });

            it('should support child combinator (>) selectors', () => {

            });

            it('should support starting child combinator (>) selectors', () => {

            });

            it('should support adjacent sibling combinator (+) selectors', () => {

            });

            it('should support starting adjacent sibling combinator (+) selectors', () => {

            });

            it('should support general sibling combinator (~) selectors', () => {

            });

            it('should support starting general sibling combinator (~) selectors', () => {

            });
        });

        it('find should return null if no element is found', () => {

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
});
