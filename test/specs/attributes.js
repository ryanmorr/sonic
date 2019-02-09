import { append } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/attributes', () => {
    it('should support [attr]', () => {
        const html = `
            <div id="foo">
                <div foo></div>
                <div></div>
                <div></div>
                <div foo></div>
                <div foo></div>
            </div>
        `;

        const expected = append(html, '#foo div[foo]');
        const root = document.querySelector('#foo');

        const elements = query('[foo]', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support [attr=value]', () => {
        const html = `
            <div id="foo">
                <div foo="bar"></div>
                <div foo="bar"></div>
                <div foo></div>
                <div foo="baz"></div>
                <div foo="bar"></div>
            </div>
        `;

        const expected = append(html, '#foo div[foo=bar]');
        const root = document.querySelector('#foo');

        ['[foo=bar]', '[foo="bar"]'].forEach((selector) => {
            const elements = query(selector, root);

            expect(elements.length).to.equal(3);
            elements.forEach((el, i) => expect(el).to.equal(expected[i]));
        });
    });

    it('should support [attr~=value]', () => {
        const html = `
            <div id="foo">
                <div foo="some random text"></div>
                <div foo="random"></div>
                <div foo="some random text"></div>
                <div foo></div>
            </div>
        `;

        const expected = append(html, '#foo [foo~="random"]');
        const root = document.querySelector('#foo');

        const elements = query('[foo~="random"]', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support [attr|=value]', () => {
        const html = `
            <div id="foo">
                <div lang="en-us"></div>
                <div lang="en-us"></div>
                <div></div>
                <span lang="en-us"></span>
            </div>
        `;

        const expected = append(html, '#foo [lang|="en"]');
        const root = document.querySelector('#foo');

        const elements = query('[lang|="en"]', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support [attr^=value]', () => {
        const html = `
            <div id="foo">
                <div foo="bar"></div>
                <div foo="baz"></div>
                <div foo></div>
                <div foo="bar"></div>
            </div>
        `;

        const expected = append(html, '#foo [foo^="ba"]');
        const root = document.querySelector('#foo');

        const elements = query('[foo^="ba"]', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support [attr$=value]', () => {
        const html = `
            <div id="foo">
                <div foo="foo bar"></div>
                <div foo="bar"></div>
                <div foo></div>
            </div>
        `;

        const expected = append(html, '#foo [foo$="bar"]');
        const root = document.querySelector('#foo');

        const elements = query('[foo$="bar"]', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support [attr*=value]', () => {
        const html = `
            <div id="foo">
                <div foo="random"></div>
                <div foo></div>
                <div foo="random"></div>
            </div>
        `;

        const expected = append(html, '#foo [foo*="rand"]');
        const root = document.querySelector('#foo');

        const elements = query('[foo*="rand"]', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });
});
