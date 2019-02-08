import { checkSelectors, body, group1, group2, group3, element1 } from '../setup';
import { matches, find, query, pseudos } from '../../src/sonic';

describe('sonic', () => {
    it('query should return an array', () => {
        expect(query('div')).to.be.an('array');
    });

    it('find should return null if no element is found', () => {
        expect(find('#foobar')).to.be.a('null');
    });

    it('should be context-aware', () => {
        const expected = document.querySelector('#group-2 section h1');
        const element = find('section h1', group2);
        expect(element).to.not.be.a('null');
        expect(element).to.equal(expected);
    });

    it('should support a contextual element as an optional second argument', () => {
        const expected = group1.querySelectorAll('div');
        const elements = query('div', group1);
        elements.forEach((el, i) => {
            expect(group1.contains(el)).to.equal(true);
            expect(el).to.equal(expected[i]);
        });
    });

    it('should support a selector string for a contextual element as an optional second argument', () => {
        const expected = group1.querySelectorAll('div');
        const elements = query('div', '#group-1');
        elements.forEach((el, i) => {
            expect(group1.contains(el)).to.equal(true);
            expect(el).to.equal(expected[i]);
        });
    });

    it('should not return duplicate elements', () => {
        const cache = [];
        const elements = query('div, div');
        elements.forEach((el) => {
            expect(cache).to.not.include(el);
            cache.push(el);
        });
    });

    it('should return elements in the order they appear in the document', () => {
        const elements = query('div');
        const expected = elements.slice().sort((a, b) => 3 - (a.compareDocumentPosition(b) & 6));
        elements.forEach((el, i) => {
            expect(el).to.equal(expected[i]);
        });
    });

    it('should accept selector strings with leading/trailing spaces', () => {
        checkSelectors([
            {selector: ' div', length: 9},
            {selector: 'div ', length: 9},
            {selector: ' div ', length: 9},
            {selector: '  div   ', length: 9}
        ]);
    });
});
