const getUniqueFlightsService = require('../services/getUniqueFlights');

// Merge sources.
exports.merge_sources = async function(_req, res) {
    try{
        const uniqueFlights = await getUniqueFlightsService.getUniqueFlights();
        res.send(uniqueFlights);
    }catch(ex){
        res.status(400)
        res.json({ message: ex.message })
    }
}
