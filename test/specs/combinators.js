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

        const elements = query('section div', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('section > div', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('> div', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('div + span', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('+ span', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('div ~ span', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
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

        const elements = query('~ span', '#foo');

        expect(elements).to.deep.equal(Array.from(expected));
    });
});
