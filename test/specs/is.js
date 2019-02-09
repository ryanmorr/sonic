import { append } from '../setup';
import { is, pseudos } from '../../src/sonic';

describe('sonic/is', () => {
    it('should return true for an element with a matching selector string', () => {
        append(`
            <section>
                <div id="foo" class="class1 class2 class3" attr="value" attr2="some random text" lang="en-us"></div>
            </section>
        `);

        const element = document.querySelector('#foo');

        const selectors = [
            'div',
            '#foo',
            '.class1',
            '.class2',
            '.class1.class2.class3',
            '[attr]',
            '[attr=value]',
            '[attr="value"]',
            '[attr][attr2][lang]',
            '[attr2~="random"]',
            '[attr2*="rand"]',
            '[attr2^="some"]',
            '[attr2$="text"]',
            '[lang|="en"]',
            ':first-child',
            ':only-child',
            'div#foo.class1.class2.class3[attr=value][attr2="some random text"][lang="en-us"]'
        ];

        selectors.forEach((selector) => expect(is(element, selector)).to.equal(true));
    });

    it('should return false for an element with a non-matching selector string', () => {
        append(`
            <section>
            <div></div>
                <div id="foo" class="class1 class2 class3" attr="value" attr2="some random text" lang="en-us"></div>
                <div></div>
            </section>
        `);

        const element = document.querySelector('#foo');

        const selectors = [
            'span',
            '#bar',
            '.class12',
            ':last-child',
            ':first-child',
            ':only-child',
            '[foo]'
        ];

        selectors.forEach((selector) => expect(is(element, selector)).to.equal(false));
    });

    it('should match custom pseudo-classes', () => {
        append(`
            <div id="foo" foo="bar" lang="en-us"></div>
        `);

        const element = document.querySelector('#foo');

        expect(() => is(element, ':foo')).to.throw();
        expect(() => is(element, ':bar(lang)')).to.throw();

        pseudos.foo = (el) => el.hasAttribute('foo');
        pseudos.bar = (el, name) => el.hasAttribute(name);

        expect(is(element, ':foo')).to.equal(true);
        expect(is(element, ':bar(lang)')).to.equal(true);

        delete pseudos.foo;
        delete pseudos.bar;
    });
});
