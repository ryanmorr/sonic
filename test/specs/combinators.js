import { checkSelectors, body, group1, group2, group3, element1 } from '../setup';
import { matches, find, query, pseudos } from '../../src/sonic';

describe('sonic/combinators', () => {
    it('should support decendant combinator (+)', () => {
        checkSelectors([
            {selector: 'section div', length: 9},
            {selector: 'section div span', length: 6},
            {selector: 'div div', context: group1, length: 2}
        ]);
    });

    it('should support child combinator (>)', () => {
        checkSelectors([
            {selector: 'section > div', length: 7},
            {selector: 'section > div > span[foo]', length: 4},
            {selector: 'section>ul>li', length: 5},
            {selector: 'ul > .list-item', context: group2, length: 5}
        ]);
    });

    it('should support leading child combinator (>)', () => {
        checkSelectors([
            {selector: '> div', context: group1, expected: body.querySelectorAll('#group-1 > div'), length: 4},
            {selector: '>div', context: group2, expected: body.querySelectorAll('#group-2 > div'), length: 3},
            {selector: '> div > i', context: group1, expected: body.querySelectorAll('#group-1 > div > i'), length: 1}
        ]);
    });

    it('should support adjacent sibling combinator (+)', () => {
        checkSelectors([
            {selector: 'div[foo] + div', length: 1},
            {selector: 'div + i + em + span', length: 1},
            {selector: 'div+span', length: 1},
            {selector: '.list-item + .list-item', context: group2, length: 4}
        ]);
    });

    it('should support leading adjacent sibling combinator (+)', () => {
        checkSelectors([
            {selector: '+ section', context: group1, expected: body.querySelectorAll('#group-1 + section'), length: 1},
            {selector: '+ div', context: element1, expected: body.querySelectorAll('#group-1 > :first-child + div'), length: 1},
            {selector: '+div', context: element1, expected: body.querySelectorAll('#group-1 > :first-child + div'), length: 1}
        ]);
    });

    it('should support general sibling combinator (~)', () => {
        checkSelectors([
            {selector: 'div[foo] ~ div', context: body, length: 4},
            {selector: 'div ~ em ~ span', context: body, length: 2},
            {selector: 'em~span', context: body, length: 2},
            {selector: 'h1 ~ [attr2]', context: group2, length: 2}
        ]);
    });

    it('should support leading general sibling combinator (~)', () => {
        checkSelectors([
            {selector: '~ section', context: group1, expected: body.querySelectorAll('#group-1 ~ section'), length: 2},
            {selector: '~ div', context: element1, expected: body.querySelectorAll('#group-1 > :first-child ~ div'), length: 3},
            {selector: '~div', context: element1, expected: body.querySelectorAll('#group-1 > :first-child ~ div'), length: 3}
        ]);
    });
});
