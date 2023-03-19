import { append } from '../setup';
import { query } from '../../src/sonic';

describe('simple', () => {
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

        expect(query('*', '#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo i')));
    });

    it('should support tag selectors', () => {
        append(`
            <button></button>
            <button></button>
            <button></button>
        `);

        expect(query('button')).to.deep.equal(Array.from(document.querySelectorAll('button')));
    });

    it('should support id selectors', () => {
        append('<div id="foo"></div>');

        expect(query('#foo')).to.deep.equal(Array.from(document.querySelectorAll('#foo')));
    });

    it('should support class selectors', () => {
        append(`
            <div class="foo"></div>
            <div class="foo"></div>
            <div></div>
            <div class="foo"></div>
        `);

        expect(query('.foo')).to.deep.equal(Array.from(document.querySelectorAll('.foo')));
    });

    it('should support multiple class selectors', () => {
        append(`
            <div class="foo bar"></div>
            <div class="foo"></div>
            <div class="foo bar"></div>
            <div class="bar"></div>
            <div class="bar foo"></div>
        `);

        expect(query('.foo.bar')).to.deep.equal(Array.from(document.querySelectorAll('.foo.bar')));
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

        expect(query('div, em, i')).to.deep.equal(Array.from(document.querySelectorAll('div, em, i')));
    });
});
