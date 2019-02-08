import { checkSelectors, body, group1, group2, group3, element1 } from '../setup';
import { matches, find, query, pseudos } from '../../src/sonic';

describe('sonic/pseudos', () => {
    it('should support :first-child', () => {
        checkSelectors([
            {selector: ':first-child', context: body, length: 9},
            {selector: ':first-child', context: group1, length: 3}
        ]);
    });

    it('should support :last-child', () => {
        checkSelectors([
            {selector: ':last-child', context: body, length: 9},
            {selector: ':last-child', context: group1, length: 3}
        ]);
    });

    it('should support :only-child', () => {
        checkSelectors([
            {selector: ':only-child', context: body, length: 2},
            {selector: ':only-child', context: group2, length: 1}
        ]);
    });

    it('should support :first-of-type', () => {
        checkSelectors([
            {selector: ':first-of-type', context: body, length: 16},
            {selector: ':first-of-type', context: group3, length: 2}
        ]);
    });

    it('should support :last-of-type', () => {
        checkSelectors([
            {selector: ':last-of-type', context: body, length: 16},
            {selector: ':last-of-type', context: group1, length: 6}
        ]);
    });

    it('should support :only-of-type', () => {
        checkSelectors([
            {selector: ':only-of-type', context: body, length: 8},
            {selector: ':only-of-type', context: group2, length: 5}
        ]);
    });

    it('should support :checked', () => {
        checkSelectors([
            {selector: ':checked', length: 2},
            {selector: ':checked', context: group2, length: 0}
        ]);
    });

    it('should support :disabled', () => {
        checkSelectors([
            {selector: ':disabled', length: 1},
            {selector: ':disabled', context: group1, length: 0}
        ]);
    });

    it('should support :enabled', () => {
        checkSelectors([
            {selector: ':enabled', length: 3},
            {selector: ':enabled', context: group2, length: 0}
        ]);
    });

    it('should support :not()', () => {
        checkSelectors([
            {selector: ':not([foo])', context: body, length: 26},
            {selector: ':not([foo])', context: group2, length: 12},
            {selector: ':not(span):not(div)', context: body, length: 19},
            {selector: ':not(span):not(div)', context: group1, length: 2}
        ]);
    });

    it('should support :nth-child()', () => {
        checkSelectors([
            {selector: ':nth-child(4n+1)', context: group1, length: 4},
            {selector: ':nth-child(-n+6)', context: group1, length: 14},
            {selector: ':nth-child(odd)', context: group1, length: 7},
            {selector: ':nth-child(even)', context: group1, length: 7},
            {selector: ':nth-child(3n)', context: group1, length: 4},
            {selector: ':nth-child(0n+1)', context: group1, length: 3},
            {selector: ':nth-child(4)', context: group1, length: 3},
            {selector: ':nth-child(-n+3)', context: group1, length: 9},
            {selector: ':nth-child(3n-2)', context: group1, length: 6}
        ]);
    });

    it('should support :nth-last-child()', () => {
        checkSelectors([
            {selector: ':nth-last-child(4n+1)', context: group2, length: 5},
            {selector: ':nth-last-child(-n+6)', context: group2, length: 12},
            {selector: ':nth-last-child(odd)', context: group2, length: 8},
            {selector: ':nth-last-child(even)', context: group2, length: 5},
            {selector: ':nth-last-child(3n)', context: group2, length: 3},
            {selector: ':nth-last-child(0n+1)', context: group2, length: 3},
            {selector: ':nth-last-child(4)', context: group2, length: 2},
            {selector: ':nth-last-child(-n+3)', context: group2, length: 7},
            {selector: ':nth-last-child(3n-2)', context: group2, length: 6}
        ]);
    });

    it('should support :nth-last-of-type()', () => {
        checkSelectors([
            {selector: ':nth-last-of-type(4n+1)', context: group1, length: 6},
            {selector: ':nth-last-of-type(-n+6)', context: group1, length: 14},
            {selector: ':nth-last-of-type(odd)', context: group1, length: 8},
            {selector: ':nth-last-of-type(even)', context: group1, length: 6},
            {selector: ':nth-last-of-type(3n)', context: group1, length: 2},
            {selector: ':nth-last-of-type(0n+1)', context: group1, length: 6},
            {selector: ':nth-last-of-type(2)', context: group1, length: 4},
            {selector: ':nth-last-of-type(-n+3)', context: group1, length: 12},
            {selector: ':nth-last-of-type(3n-2)', context: group1, length: 8}
        ]);
    });

    it('should support :nth-of-type()', () => {
        checkSelectors([
            {selector: ':nth-of-type(4n+1)', context: group2, length: 8},
            {selector: ':nth-of-type(-n+6)', context: group2, length: 13},
            {selector: ':nth-of-type(odd)', context: group2, length: 10},
            {selector: ':nth-of-type(even)', context: group2, length: 3},
            {selector: ':nth-of-type(3n)', context: group2, length: 2},
            {selector: ':nth-of-type(0n+1)', context: group2, length: 7},
            {selector: ':nth-of-type(4)', context: group2, length: 1},
            {selector: ':nth-of-type(-n+3)', context: group2, length: 11},
            {selector: ':nth-of-type(3n-2)', context: group2, length: 8}
        ]);
    });

    it('should support custom pseudo-class selectors', () => {
        pseudos.foo = (el) => el.hasAttribute('foo');
        pseudos.bar = (el, name) => el.hasAttribute(name);
        checkSelectors([
            {selector: ':foo', expected: body.querySelectorAll('[foo]'), length: 9},
            {selector: ':bar(lang)', expected: body.querySelectorAll('[lang]'), length: 2}
        ]);
    });
});
