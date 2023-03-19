import { append } from '../setup';
import { find, query } from '../../src/sonic';

describe('sonic', () => {
    it('should return an array', () => {
        expect(query('body')).to.be.an('array');
    });

    it('should return an element', () => {
        const body = find('body');

        expect(body.nodeType).to.equal(1);
        expect(body.nodeName).to.equal('BODY');
    });

    it('should return null if no element is found', () => {
        expect(find('#nonexistent')).to.equal(null);
    });

    it('should return the first element of query', () => {
        append(`
            <div></div>
            <div></div>
            <div></div>
        `);

        expect(find('div')).to.equal(query('div')[0]);
    });

    it('should support a contextual element as an optional second argument', () => {
        append(`
            <div id="foo">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `);

        const root = document.querySelector('#foo');
        expect(query('span', root)).to.deep.equal(Array.from(document.querySelectorAll('#foo span')));
    });

    it('should support a selector string for a contextual element as an optional second argument', () => {
        append(`
            <div id="foo">
                <em></em>
                <em></em>
                <em></em>
            </div>
        `);

        expect(query('em', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo em')));
    });

    it('should be context-aware', () => {
        append(`
            <section id="foo">
                <h1>Top Heading</h1>
                <section>
                    <h1>Sub Heading</h1>
                </section>
            </section>
        `);

        expect(find('section h1', '#foo')).to.equal(document.querySelector('#foo section h1'));
    });

    it('should not return duplicate elements', () => {
        append(`
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        `);

        const elements = query('div, div');

        const cache = [];
        elements.forEach((el) => {
            expect(cache).to.not.include(el);
            cache.push(el);
        });
    });

    it('should return elements in the order they appear in the document', () => {
        append(`
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        `);

        const elements = query('div');
        const expected = elements.slice().sort((a, b) => 3 - (a.compareDocumentPosition(b) & 6));

        expect(elements).to.deep.equal(expected);
    });

    it('should accept selector strings with leading/trailing spaces', () => {
        append('<div id="foo"></div>');

        const expected = document.querySelector('#foo');

        [
            ' #foo',
            '#foo ',
            ' #foo ',
            '  #foo   '
        ].forEach((selector) => {
            expect(find(selector)).to.equal(expected);
        });
    });
});
