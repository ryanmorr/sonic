import { append } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/combinators', () => {
    it('should support decendant combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <section>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </section>
            </div>
        `;

        const expected = append(html, '#foo section div');
        const root = document.querySelector('#foo');

        const elements = query('section div', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support child combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <section>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </section>
            </div>
        `;

        const expected = append(html, '#foo section > div');
        const root = document.querySelector('#foo');

        const elements = query('section > div', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support leading child combinator', () => {
        const html = `
            <div id="foo">
                <div class="foo"></div>
                <section>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </section>
                <div class="foo"></div>
            </div>
        `;

        const expected = append(html, '#foo div.foo');
        const root = document.querySelector('#foo');

        const elements = query('> div', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support adjacent sibling combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <span></span>
            </div>
        `;

        const expected = append(html, '#foo div + span');
        const root = document.querySelector('#foo');

        const elements = query('div + span', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support leading adjacent sibling combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <span></span>
            </div>
            <span></span>
            <span></span>
        `;

        const expected = append(html, '#foo + span');
        const root = document.querySelector('#foo');

        const elements = query('+ span', root);

        expect(elements.length).to.equal(1);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support general sibling combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <span></span>
            </div>
        `;

        const expected = append(html, '#foo div ~ span');
        const root = document.querySelector('#foo');

        const elements = query('div ~ span', root);

        expect(elements.length).to.equal(3);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });

    it('should support leading general sibling combinator', () => {
        const html = `
            <div id="foo">
                <div></div>
                <span></span>
            </div>
            <span></span>
            <span></span>
        `;

        const expected = append(html, '#foo ~ span');
        const root = document.querySelector('#foo');

        const elements = query('~ span', root);

        expect(elements.length).to.equal(2);
        elements.forEach((el, i) => expect(el).to.equal(expected[i]));
    });
});
