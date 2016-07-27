/* eslint-disable max-len, no-unused-expressions */

import { expect } from 'chai';
import sonic, { is, find, query, pseudos } from '../src/sonic';

describe('sonic', () => {
    it('should support importing of individual methods/properties (is, find, query, pseudos)', () => {
        expect(is).to.be.a('function');
        expect(find).to.be.a('function');
        expect(query).to.be.a('function');
        expect(pseudos).to.be.an('object');
        expect(pseudos).to.be.empty;
    });

    it('should support importing of sonic namespace', () => {
        expect(sonic.is).to.be.a('function');
        expect(sonic.find).to.be.a('function');
        expect(sonic.query).to.be.a('function');
        expect(sonic.pseudos).to.be.an('object');
        expect(sonic.is).to.equal(is);
        expect(sonic.find).to.equal(find);
        expect(sonic.query).to.equal(query);
        expect(sonic.pseudos).to.equal(pseudos);
    });
});
