const sinon = require("sinon");
const { assert, expect } = require("chai");
const request = require('request');

const { makeRequest } = require('./makeRequest');

describe('makeRequest', () => {
    let requestGetStub;
    beforeEach(function() {
        requestGetStub = sinon.stub(request, 'get');
    });
    afterEach(function() {
        requestGetStub.restore();
    });

    it('should call make request with correct arguments', async () => {
        const expectedResponse = { foo : 'bar' };
        requestGetStub.yields(null, { statusCode : 200 }, expectedResponse);

        const actualResponse = await makeRequest('test/url', {});
        expect(requestGetStub.calledWith('test/url', sinon.match.object)).to.be.true;
        assert.deepStrictEqual(actualResponse, expectedResponse)
    });

    it('should return default on error', async () => {
        requestGetStub.yields(null, { statusCode : 400 }, { foo : 'bar' });
        const defaultResponse = {"TEST_KEY": "TEST_VALUE"};

        const actualResponse = await makeRequest('test/url', defaultResponse);
        expect(requestGetStub.calledWith('test/url', sinon.match.object)).to.be.true;
        assert.deepStrictEqual(actualResponse, defaultResponse)
    });
})


