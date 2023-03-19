import { append } from '../setup';
import { query } from '../../src/sonic';

describe('combinators', () => {
    it('should support decendant combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <section>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </section>
            </div>
        `);

        expect(query('section div', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo section div')));
    });

    it('should support child combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <section>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </section>
            </div>
        `);

        expect(query('section > div', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo section > div')));
    });

    it('should support leading child combinator', () => {
        append(`
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
        `);

        expect(query('> div', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div.foo')));
    });

    it('should support adjacent sibling combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <span></span>
            </div>
        `);

        expect(query('div + span', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div + span')));
    });

    it('should support leading adjacent sibling combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <span></span>
            </div>
            <span></span>
            <span></span>
        `);

        expect(query('+ span', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo + span')));
    });

    it('should support general sibling combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <span></span>
                <div></div>
                <span></span>
                <span></span>
            </div>
        `);

        expect(query('div ~ span', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo div ~ span')));
    });

    it('should support leading general sibling combinator', () => {
        append(`
            <div id="foo">
                <div></div>
                <span></span>
            </div>
            <span></span>
            <span></span>
        `);

        expect(query('~ span', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo ~ span')));
    });
});
