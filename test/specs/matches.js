import { body, group1, group2, group3, element1 } from '../setup';
import { matches, pseudos } from '../../src/sonic';

describe('sonic/matches', () => {
    it('should return true for an element with a matching selector string', () => {
        const selectors = [
            'div',
            '#element-1',
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
            'div#element-1.class1.class2.class3[attr=value][attr2="some random text"][lang="en-us"]'
        ];
        selectors.forEach((selector) => expect(matches(element1, selector)).to.equal(true));
    });

    it('should return false for an element with a non-matching selector string', () => {
        const selectors = [
            'span',
            '#element',
            '.class12',
            ':last-child',
            '[foo]',
            ':last-child'
        ];
        selectors.forEach((selector) => expect(matches(element1, selector)).to.equal(false));
    });
});
