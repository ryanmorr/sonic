import { append } from '../setup';
import { find, query } from '../../src/sonic';

describe('sonic', () => {
    it('query should return an array', () => {
        append('<div></div>');

        expect(query('div')).to.be.an('array');
    });

    it('find should return an element', () => {
        append('<div></div>');

        const div = find('div');

        expect(div.nodeType).to.equal(1);
        expect(div.nodeName).to.equal('DIV');
    });

    it('find should return null if no element is found', () => {
        expect(find('#nonexistent')).to.equal(null);
    });

    it('find should return the first element of query', () => {
        const expected = append('<div></div><div class="foo"></div><div></div>', '.foo');

        const element = find('.foo');
        const elements = query('.foo');

        expect(element).to.equal(elements[0]);
        expect(element).to.equal(expected[0]);
    });

    it('should support a contextual element as an optional second argument', () => {
        const html = `
            <div id="foo">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        const expected = append(html, '#foo span');
        const root = document.querySelector('#foo');

        const elements = query('span', root);

        expect(elements.length).to.equal(expected.length);
        elements.forEach((el, i) => {
            expect(el.nodeName).to.equal('SPAN');
            expect(root.contains(el)).to.equal(true);
            expect(el).to.equal(expected[i]);
        });
    });

    it('should support a selector string for a contextual element as an optional second argument', () => {
        const html = `
            <div id="foo">
                <em></em>
                <em></em>
                <em></em>
            </div>
        `;

        const expected = append(html, '#foo em');
        const root = document.querySelector('#foo');

        const elements = query('em', '#foo');

        expect(elements.length).to.equal(expected.length);
        elements.forEach((el, i) => {
            expect(el.nodeName).to.equal('EM');
            expect(root.contains(el)).to.equal(true);
            expect(el).to.equal(expected[i]);
        });
    });

    it('should be context-aware', () => {
        const html = `
            <section id="foo">
                <h1>Top Heading</h1>
                <section>
                    <h1>Sub Heading</h1>
                </section>
            </section>
        `;

        const expected = append(html, '#foo section h1');
        const root = document.querySelector('#foo');

        const element = find('section h1', root);

        expect(element).to.equal(expected[0]);
    });

    it('should not return duplicate elements', () => {
        append('<div></div><div></div>');

        const elements = query('div, div');

        const cache = [];
        elements.forEach((el) => {
            expect(cache).to.not.include(el);
            cache.push(el);
        });
    });

    it('should return elements in the order they appear in the document', () => {
        append('<div></div><div></div>');

        const elements = query('div');

        const expected = elements.slice().sort((a, b) => 3 - (a.compareDocumentPosition(b) & 6));

        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should accept selector strings with leading/trailing spaces', () => {
        const expected = append('<div id="foo"></div>', '#foo')[0];

        [' #foo', '#foo ', ' #foo ', '  #foo   '].forEach((selector) => {
            expect(find(selector)).to.equal(expected);
        });
    });
});
