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
        const root = document.querySelector('#foo');

        const elements = query(':first-child', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        const elements = query(':last-child', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        const elements = query(':checked', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support :disabled', () => {
        const html = `
            <form id="foo">
                <input type="checkbox" disabled />
            </form>
        `;

        const expected = append(html, '#foo input');
        const root = document.querySelector('#foo');

        const elements = query(':disabled', root);

        expect(elements.length).to.equal(1);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        const elements = query(':enabled', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        const elements = query(':not(div)', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        pseudos.foo = (el) => el.hasAttribute('foo');

        const elements = query(':foo', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
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
        const root = document.querySelector('#foo');

        pseudos.foo = (el, name) => el.hasAttribute(name);

        const elements = query(':foo(bar)', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });
});
