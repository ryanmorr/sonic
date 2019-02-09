import { append, testResults } from '../setup';
import { query, pseudos } from '../../src/sonic';

describe('sonic/pseudos', () => {
    it('should support :first-child', () => {
        append(`
            <div id="foo">
                <i></i>
                <i></i>
                <i>
                    <i></i>
                </i>
            </div>
        `);

        const elements = query(':first-child', '#foo');

        testResults(elements, '#foo i:first-child');
    });

    it('should support :last-child', () => {
        append(`
            <div id="foo">
                <i></i>
                <i>
                    <i></i>
                </i>
                <i></i>
            </div>
        `);

        const elements = query(':last-child', '#foo');

        testResults(elements, '#foo i:last-child');
    });

    it('should support :checked', () => {
        append(`
            <form id="foo">
                <input type="checkbox" checked />
                <input type="checkbox" checked />
                <input type="checkbox" />
            </form>
        `);

        const elements = query(':checked', '#foo');

        testResults(elements, '#foo input:checked');
    });

    it('should support :disabled', () => {
        append(`
            <form id="foo">
                <input type="checkbox" disabled />
            </form>
        `);

        const elements = query(':disabled', '#foo');

        testResults(elements, '#foo input');
    });

    it('should support :enabled', () => {
        append(`
            <form id="foo">
                <input type="checkbox" />
                <input type="checkbox" disabled />
                <input type="checkbox" />
            </form>
        `);

        const elements = query(':enabled', '#foo');

        testResults(elements, '#foo input:enabled');
    });

    it('should support :not()', () => {
        append(`
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <div></div>
            </div>
        `);

        const elements = query(':not(div)', '#foo');

        testResults(elements, '#foo span');
    });

    it('should support custom pseudo-class selectors', () => {
        append(`
            <div id="foo">
                <div foo></div>
                <div></div>
                <section foo></section>
            </div>
        `);

        pseudos.foo = (el) => el.hasAttribute('foo');

        const elements = query(':foo', '#foo');

        testResults(elements, '#foo [foo]');
    });

    it('should support custom pseudo-class selectors with values', () => {
        append(`
            <div id="foo">
                <div foo></div>
                <div bar></div>
                <div foo></div>
                <div bar></div>
            </div>
        `);

        pseudos.foo = (el, name) => el.hasAttribute(name);

        const elements = query(':foo(bar)', '#foo');

        testResults(elements, '#foo [bar]');
    });
});
