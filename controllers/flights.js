const getUniqueFlightsService = require('../services/getUniqueFlights');

exports.getFlights = async function(_req, res) {
    try{
        const uniqueFlights = await getUniqueFlightsService.getUniqueFlights();
        res.send(uniqueFlights);
    }catch(ex){
        res.status(400)
        res.json({ message: ex.message })
    }
}
