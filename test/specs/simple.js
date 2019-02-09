import { append } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/simple', () => {
    it('should support the universal selector (*)', () => {
        const html = `
            <div id="foo">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        `;

        const expected = append(html, '#foo i');
        const root = document.querySelector('#foo');

        const elements = query('*', root);

        expect(elements.length).to.equal(5);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support tag selectors', () => {
        const html = `
            <button></button>
            <button></button>
            <button></button>
        `;

        const expected = append(html, 'button');

        const elements = query('button');

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support id selectors', () => {
        const html = '<div id="foo"></div>';

        const expected = append(html, '#foo');

        const elements = query('#foo');

        expect(elements.length).to.equal(1);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support class selectors', () => {
        const html = `
            <div class="foo"></div>
            <div class="foo"></div>
            <div></div>
            <div class="foo"></div>
        `;

        const expected = append(html, '.foo');

        const elements = query('.foo');

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support multiple class selectors', () => {
        const html = `
            <div class="foo bar"></div>
            <div class="foo"></div>
            <div class="foo bar"></div>
            <div class="bar"></div>
            <div class="bar foo"></div>
        `;

        const expected = append(html, '.foo.bar');

        const elements = query('.foo.bar');

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support multiple selectors', () => {
        const html = `
            <div></div>
            <div></div>
            <em></em>
            <i></i>
            <i></i>
            <i></i>
        `;

        const expected = append(html, 'div, em, i');

        const elements = query('div, em, i');

        expect(elements.length).to.equal(6);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });
});
