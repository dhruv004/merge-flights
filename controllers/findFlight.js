const makeRequest = require('../helpers/makeRequest');

const defaultResponse = {
    flights: []
}

// Merge sources.
exports.merge_sources = async function(req, res) {
    try{
        const [source1, source2] = await Promise.all([
            makeRequest('https://discovery-stub.comtravo.com/source1', defaultResponse),
            makeRequest('https://discovery-stub.comtravo.com/source2', defaultResponse)
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

        res.send(Array.from(flightMap.values()));
    }catch(ex){
        res.status(400).json({ message: ex.message })
    }
}