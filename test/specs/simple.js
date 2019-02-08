import { checkSelectors, body, group1, group2, group3, element1 } from '../setup';
import { matches, find, query, pseudos } from '../../src/sonic';

describe('sonic/simple', () => {
    it('should support the universal selector (*)', () => {
        checkSelectors([
            {selector: '*', context: body, length: 35},
            {selector: '*', context: group1, length: 14}
        ]);
    });

    it('should support tag selectors', () => {
        checkSelectors([
            {selector: 'section', length: 4},
            {selector: 'div', context: group1, length: 6}
        ]);
    });

    it('should support id selectors', () => {
        checkSelectors([
            {selector: '#group-1', length: 1},
            {selector: '#element-1', length: 1},
            {selector: '#group-1', context: group1, length: 0}
        ]);
    });

    it('should support class selectors', () => {
        checkSelectors([
            {selector: '.class1', length: 3},
            {selector: '.class1.class2', length: 3},
            {selector: '.class1.class2.class3', length: 1},
            {selector: '.class1.class2', context: group1, length: 2}
        ]);
    });

    it('should support multiple selectors', () => {
        checkSelectors([
            {selector: 'div, span', length: 16},
            {selector: 'span, em, i', context: group1, length: 8}
        ]);
    });
});
