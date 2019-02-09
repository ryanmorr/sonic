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

        const elements = query('[foo]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        ['[foo=bar]', '[foo="bar"]'].forEach((selector) => {
            const elements = query(selector, '#foo');

            expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('[foo~="random"]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('[lang|="en"]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('[foo^="ba"]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('[foo$="bar"]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('[foo*="rand"]', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });
});
