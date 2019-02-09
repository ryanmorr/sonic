import { append } from '../setup';
import { query, pseudos } from '../../src/sonic';

describe('sonic/pseudos', () => {
    it('should support :first-child', () => {
        const html = `
            <div id="foo">
                <i></i>
                <i></i>
                <i>
                    <i></i>
                </i>
            </div>
        `;

        const expected = append(html, '#foo i:first-child');

        const elements = query(':first-child', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support :last-child', () => {
        const html = `
            <div id="foo">
                <i></i>
                <i>
                    <i></i>
                </i>
                <i></i>
            </div>
        `;

        const expected = append(html, '#foo i:last-child');

        const elements = query(':last-child', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support :checked', () => {
        const html = `
            <form id="foo">
                <input type="checkbox" checked />
                <input type="checkbox" checked />
                <input type="checkbox" />
            </form>
        `;

        const expected = append(html, '#foo input:checked');

        const elements = query(':checked', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support :disabled', () => {
        const html = `
            <form id="foo">
                <input type="checkbox" disabled />
            </form>
        `;

        const expected = append(html, '#foo input');

        const elements = query(':disabled', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support :enabled', () => {
        const html = `
            <form id="foo">
                <input type="checkbox" />
                <input type="checkbox" disabled />
                <input type="checkbox" />
            </form>
        `;

        const expected = append(html, '#foo input:enabled');

        const elements = query(':enabled', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support :not()', () => {
        const html = `
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <div></div>
            </div>
        `;

        const expected = append(html, '#foo span');

        const elements = query(':not(div)', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support custom pseudo-class selectors', () => {
        const html = `
            <div id="foo">
                <div foo></div>
                <div></div>
                <section foo></section>
            </div>
        `;

        const expected = append(html, '#foo [foo]');

        pseudos.foo = (el) => el.hasAttribute('foo');

        const elements = query(':foo', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });

    it('should support custom pseudo-class selectors with values', () => {
        const html = `
            <div id="foo">
                <div foo></div>
                <div bar></div>
                <div foo></div>
                <div bar></div>
            </div>
        `;

        const expected = append(html, '#foo [bar]');

        pseudos.foo = (el, name) => el.hasAttribute(name);

        const elements = query(':foo(bar)', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });
});
