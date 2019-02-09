import { append, testResults } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/attributes', () => {
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

        const elements = query('[foo]', '#foo');

        testResults(elements, '#foo div[foo]');
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

        ['[foo=bar]', '[foo="bar"]'].forEach((selector) => {
            const elements = query(selector, '#foo');

            testResults(elements, '#foo div[foo=bar]');
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

        const elements = query('[foo~="random"]', '#foo');

        testResults(elements, '#foo [foo~="random"]');
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

        const elements = query('[lang|="en"]', '#foo');

        testResults(elements, '#foo [lang|="en"]');
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

        const elements = query('[foo^="ba"]', '#foo');

        testResults(elements, '#foo [foo^="ba"]');
    });

    it('should support [attr$=value]', () => {
        append(`
            <div id="foo">
                <div foo="foo bar"></div>
                <div foo="bar"></div>
                <div foo></div>
            </div>
        `);

        const elements = query('[foo$="bar"]', '#foo');

        testResults(elements, '#foo [foo$="bar"]');
    });

    it('should support [attr*=value]', () => {
        append(`
            <div id="foo">
                <div foo="random"></div>
                <div foo></div>
                <div foo="random"></div>
            </div>
        `);

        const elements = query('[foo*="rand"]', '#foo');

        testResults(elements, '#foo [foo*="rand"]');
    });
});
