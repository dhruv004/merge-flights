const sinon = require("sinon");
const { assert, expect } = require("chai");

var findFlightController = require('./findFlight');
var getUniqueFlightsService = require('../services/getUniqueFlights');

describe('findFlightController()', () => {
    let getUniqueFlightsServiceStub;

    beforeEach(() => {
        getUniqueFlightsServiceStub = sinon.stub(getUniqueFlightsService, "getUniqueFlights")
    })

    afterEach(() => {
        getUniqueFlightsServiceStub.restore()
    })

    it('should return error', async () => {
        const response = {
            status: sinon.stub(),
            json: sinon.stub(),
        }
        const error = new Error('Error');
        getUniqueFlightsServiceStub.rejects(error)

        try{
            await findFlightController.merge_sources(null, response)
            throw new Error('This test should not pass');
        }catch{
            expect(getUniqueFlightsServiceStub.calledOnce).to.be.true;
            expect(response.status.calledOnce).to.be.true;
            assert.deepStrictEqual(response.status.firstCall.args[0], 400);
            expect(response.json.calledOnce).to.be.true;
            assert.deepStrictEqual(response.json.firstCall.args[0], { message : error.message });
        }
    })

    it('should return unique flights', async () => {
        const response = {
            send: sinon.spy()
        }
        const data = [{
            id: 1
        }]
        getUniqueFlightsServiceStub.resolves(data)

        await findFlightController.merge_sources(null, response)

        expect(getUniqueFlightsServiceStub.calledOnce).to.be.true;
        expect(response.send.calledOnce).to.be.true;
        assert.deepStrictEqual(response.send.firstCall.args[0], data);
    })
})
