const sinon = require("sinon");
const { assert, expect } = require("chai");

const requestUtil = require('../helpers/makeRequest');
const { getUniqueFlights } = require('./getUniqueFlights');

describe('getUniqueFlights',() => {
  let requestUtilStub;

  beforeEach(() => {
    requestUtilStub = sinon.stub(requestUtil, "makeRequest")
  })

  afterEach(() => {
    requestUtilStub.restore()
  })


  it('should return unique values', async() => {
    const flightsData = {flights: [{
      slices:[{
        "origin_name":"Schonefeld",
        "destination_name":"Stansted",
        "departure_date_time_utc":"2019-08-08T04:30:00.000Z",
        "arrival_date_time_utc":"2019-08-08T06:25:00.000Z",
        "flight_number":"144",
        "duration":115
      },{
        "origin_name":"Schonefeld",
        "destination_name":"Stansted",
        "departure_date_time_utc":"2019-08-08T04:30:00.000Z",
        "arrival_date_time_utc":"2019-08-08T06:25:00.000Z",
        "flight_number":"144",
        "duration":115
      }]
    }]};
    requestUtilStub.resolves(flightsData);
    const uniqueValues = await getUniqueFlights();
    expect(uniqueValues.length).to.equal(1);
    assert.deepStrictEqual(uniqueValues, [flightsData.flights[0].slices[0]]);
  })

  it('should return multiple when different values', async () => {
    const flightsData = {flights: [{
      slices:[{
        "origin_name":"Schonefeld",
        "destination_name":"Stansted",
        "departure_date_time_utc":"2019-08-08T04:30:00.000Z",
        "arrival_date_time_utc":"2019-08-08T06:25:00.000Z",
        "flight_number":"144",
        "duration":115
      },{
        "origin_name":"Schonefeld",
        "destination_name":"Stansted",
        "departure_date_time_utc":"2019-08-08T04:30:00.000Z",
        "arrival_date_time_utc":"2019-08-08T06:25:00.000Z",
        "flight_number":"145",
        "duration":115
      }]
    }]};
    requestUtilStub.resolves(flightsData);
    const uniqueValues = await getUniqueFlights();
    expect(uniqueValues.length).to.equal(2);
    assert.deepStrictEqual(uniqueValues, flightsData.flights[0].slices);
  })
});
