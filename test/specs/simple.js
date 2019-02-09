import { append, testResults } from '../setup';
import { query } from '../../src/sonic';

describe('sonic/simple', () => {
    it('should support the universal selector (*)', () => {
        append(`
            <div id="foo">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        `);

        const elements = query('*', '#foo');

        testResults(elements, '#foo i');
    });

    it('should support tag selectors', () => {
        append(`
            <button></button>
            <button></button>
            <button></button>
        `);

        const elements = query('button');

        testResults(elements, 'button');
    });

    it('should support id selectors', () => {
        append('<div id="foo"></div>');

        const elements = query('#foo');

        testResults(elements, '#foo');
    });

    it('should support class selectors', () => {
        append(`
            <div class="foo"></div>
            <div class="foo"></div>
            <div></div>
            <div class="foo"></div>
        `);

        const elements = query('.foo');

        testResults(elements, '.foo');
    });

    it('should support multiple class selectors', () => {
        append(`
            <div class="foo bar"></div>
            <div class="foo"></div>
            <div class="foo bar"></div>
            <div class="bar"></div>
            <div class="bar foo"></div>
        `);

        const elements = query('.foo.bar');

        testResults(elements, '.foo.bar');
    });

    it('should support multiple selectors', () => {
        append(`
            <div></div>
            <div></div>
            <em></em>
            <i></i>
            <i></i>
            <i></i>
        `);

        const elements = query('div, em, i');

        testResults(elements, 'div, em, i');
    });
});
