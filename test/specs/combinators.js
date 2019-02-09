import { append, testResults } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/combinators', () => {
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

        const elements = query('section div', '#foo');

        testResults(elements, '#foo section div');
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

        const elements = query('section > div', '#foo');

        testResults(elements, '#foo section > div');
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

        const elements = query('> div', '#foo');

        testResults(elements, '#foo div.foo');
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

        const elements = query('div + span', '#foo');

        testResults(elements, '#foo div + span');
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

        const elements = query('+ span', '#foo');

        testResults(elements, '#foo + span');
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

        const elements = query('div ~ span', '#foo');

        testResults(elements, '#foo div ~ span');
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

        const elements = query('~ span', '#foo');

        testResults(elements, '#foo ~ span');
    });
});
