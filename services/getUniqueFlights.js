const requestUtil = require('../helpers/makeRequest');

const defaultResponse = {
    flights: []
};

const getUniqueFlights = async () => {
    const [source1, source2] = await Promise.all([
        requestUtil.makeRequest('https://discovery-stub.comtravo.com/source1', defaultResponse),
        requestUtil.makeRequest('https://discovery-stub.comtravo.com/source2', defaultResponse)
    ])

    const allFlights = [...source1.flights, ...source2.flights];
    const flightMap = new Map();
    allFlights.forEach(flight => {
        if(flight.slices && Array.isArray(flight.slices)){
            flight.slices.forEach(slice => {
                const key = `${slice.flight_number}_${slice.arrival_date_time_utc}_${slice.departure_date_time_utc}`
                flightMap.set(key, slice);
            })
        }
    })

    return Array.from(flightMap.values())
}

module.exports = {
    getUniqueFlights
}
