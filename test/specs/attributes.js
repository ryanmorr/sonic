import { checkSelectors, body, group1, group2, group3, element1 } from '../setup';
import { matches, find, query, pseudos } from '../../src/sonic';

describe('sonic/attributes', () => {
    it('should support [attr]', () => {
        checkSelectors([
            {selector: '[foo]', length: 9},
            {selector: '[attr][attr2]', length: 2},
            {selector: '[attr][attr2][lang]', length: 1},
            {selector: '[attr2]', context: group2, length: 2}
        ]);
    });

    it('should support [attr=value]', () => {
        checkSelectors([
            {selector: '[attr=value]', length: 2},
            {selector: '[attr="value"]', length: 2},
            {selector: "[attr='value']", length: 2},
            {selector: '[attr=\'value\']', length: 2},
            {selector: '[attr=value]', context: group2, length: 1}
        ]);
    });

    it('should support [attr~=value]', () => {
        checkSelectors([
            {selector: '[attr2~="random"]', length: 3},
            {selector: '[attr2~="random"]', context: group2, length: 2}
        ]);
    });

    it('should support [attr|=value]', () => {
        checkSelectors([
            {selector: '[lang|="en"]', length: 2},
            {selector: '[lang|="en"]', context: group2, length: 0}
        ]);
    });

    it('should support [attr^=value]', () => {
        checkSelectors([
            {selector: '[attr2^="some"]', length: 3},
            {selector: '[attr2^="some"]', context: group2, length: 2}
        ]);
    });

    it('should support [attr$=value]', () => {
        checkSelectors([
            {selector: '[attr2$="text"]', length: 3},
            {selector: '[attr2$="text"]', context: group2, length: 2}
        ]);
    });

    it('should support [attr*=value]', () => {
        checkSelectors([
            {selector: '[attr2*="rand"]', length: 3},
            {selector: '[attr2*="rand"]', context: group2, length: 2}
        ]);
    });
});
