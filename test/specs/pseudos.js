import { append } from '../setup';
import { query, pseudos } from '../../src/sonic';

describe('pseudos', () => {
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

        expect(query(':first-child', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo i:first-child')));
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

        expect(query(':last-child', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo i:last-child')));
    });

    it('should support :checked', () => {
        append(`
            <form id="foo">
                <input type="checkbox" checked />
                <input type="checkbox" checked />
                <input type="checkbox" />
            </form>
        `);

        expect(query(':checked', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo input:checked')));
    });

    it('should support :disabled', () => {
        append(`
            <form id="foo">
                <input type="checkbox" disabled />
            </form>
        `);

        expect(query(':disabled', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo input')));
    });

    it('should support :enabled', () => {
        append(`
            <form id="foo">
                <input type="checkbox" />
                <input type="checkbox" disabled />
                <input type="checkbox" />
            </form>
        `);

        expect(query(':enabled', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo input:enabled')));
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

        expect(query(':not(div)', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo span')));
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

        expect(query(':foo', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [foo]')));
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

        expect(query(':foo(bar)', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo [bar]')));
    });
});
