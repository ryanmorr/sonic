import { append } from '../setup';
import { query } from '../../src/sonic';

describe('attributes', () => {
    it('should support [attr]', () => {
        append(`
            <div id="foo">
                <div foo></div>
                <div></div>
                <div></div>
                <div foo></div>
                <div foo></div>
            </div>
        `);

        expect(query('[foo]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div[foo]')));
    });

    it('should support [attr=value]', () => {
        append(`
            <div id="foo">
                <div foo="bar"></div>
                <div foo="bar"></div>
                <div foo></div>
                <div foo="baz"></div>
                <div foo="bar"></div>
            </div>
        `);

        [
            '[foo=bar]', 
            '[foo="bar"]',
            `[foo='bar']` // eslint-disable-line quotes
        ].forEach((selector) => {
            expect(query(selector, '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div[foo=bar]')));
        });
    });

    it('should support [attr~=value]', () => {
        append(`
            <div id="foo">
                <div foo="some random text"></div>
                <div foo="random"></div>
                <div foo="some random text"></div>
                <div foo></div>
            </div>
        `);

        expect(query('[foo~="random"]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [foo~="random"]')));
    });

    it('should support [attr|=value]', () => {
        append(`
            <div id="foo">
                <div lang="en-us"></div>
                <div lang="en-us"></div>
                <div></div>
                <span lang="en-us"></span>
            </div>
        `);

        expect(query('[lang|="en"]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [lang|="en"]')));
    });

    it('should support [attr^=value]', () => {
        append(`
            <div id="foo">
                <div foo="bar"></div>
                <div foo="baz"></div>
                <div foo></div>
                <div foo="bar"></div>
            </div>
        `);

        expect(query('[foo^="ba"]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [foo^="ba"]')));
    });

    it('should support [attr$=value]', () => {
        append(`
            <div id="foo">
                <div foo="foo bar"></div>
                <div foo="bar"></div>
                <div foo></div>
            </div>
        `);

        expect(query('[foo$="bar"]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [foo$="bar"]')));
    });

    it('should support [attr*=value]', () => {
        append(`
            <div id="foo">
                <div foo="random"></div>
                <div foo></div>
                <div foo="random"></div>
            </div>
        `);

        expect(query('[foo*="rand"]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [foo*="rand"]')));
    });

    it('should support [attr="value" i]', () => {
        append(`
            <div id="foo">
                <div foo="bar"></div>
                <div foo="BAR"></div>
                <div foo="Bar"></div>
            </div>
        `);

        expect(query('[foo="bar" i]', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div')));
    });
});
