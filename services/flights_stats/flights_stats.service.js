//modules
const axios = require("axios");

//api variables
const flights_endpoint = "action/datastore_search";
const flights_query = "?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=300";
const inbound_flights_filter = 'filters={"CHCINT":""}';
const path = flights_endpoint.concat(flights_query);


const services = {
    totalFlights: (req, res, next) => {
        axios.get(path)
            .then((response) => {
                let data = response.data;
                let total = data.result.total;
                res.status(200).send(total.toString());
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            })
    }

}

module.exports = services;