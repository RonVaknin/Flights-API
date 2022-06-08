//modules
const axios = require("axios");

//api variables
const flights_endpoint = "action/datastore_search";
const flights_limit = "limit=1";
const flights_recource = "resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5";
const flights_query = "?" + flights_recource + '&' + flights_limit;
const inbound_flights_filter = 'filters={"CHCINT":""}';
const delayed_flights_filter = 'filters={"CHRMINE":"DELAYED"}';
const city_name_filter = "fields=CHLOC1T";

function getCountryQuery(country) {
    //TODO:: restrict to only country by: CHLOCCT to be added to filters and uppercase country name
    return "q=" + country;
}

const services = {
    totalFlights: (req, res, next) => {
        let full_query = flights_endpoint.concat(flights_query);
        if(req.query.country){
            full_query = full_query.concat('&', getCountryQuery(req.query.country));
        }

        axios.get(full_query)
            .then((response) => {
                let data = response.data;
                let total = data.result.total;
                res.status(200).send(total.toString());
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            })
    },
    totalInboundFlights: (req, res, next) => {
        let full_query = flights_endpoint.concat(flights_query, '&', inbound_flights_filter);
        if(req.query.country){
            full_query = full_query.concat('&', getCountryQuery(req.query.country));
        }

        axios.get(full_query)
            .then((response) => {
                let data = response.data;
                let total = data.result.total;
                res.status(200).send(total.toString());
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            })
    },
    totalOutboundFlights: (req, res, next) => {
        let full_query_total = flights_endpoint.concat(flights_query);
        let full_query_inbound = flights_endpoint.concat(flights_query, '&', inbound_flights_filter);
        if(req.query.country){
            let country_query =  getCountryQuery(req.query.country);
            full_query_total = full_query_total.concat('&', country_query);
            full_query_inbound = full_query_inbound.concat('&', country_query);
        }
        
        axios.get(full_query_total)
        .then((response) => {
            let data = response.data;
            let total = data.result.total;
            return (total);
        })
        .catch((error) => {
            res.sendStatus(error.response.status);
        })
        .then((total_flights) => {
            axios.get(full_query_inbound)
            .then((response) => {
                let data = response.data;
                let total_inbound = data.result.total;
                let outbound = total_flights - total_inbound;
                res.status(200).send(outbound.toString());
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            })
        })
        
    },
    totalDelayes: (req, res, next) => {
        let full_query = flights_endpoint.concat(flights_query, '&', delayed_flights_filter);
        axios.get(full_query)
            .then((response) => {
                let data = response.data;
                let total = data.result.total;
                res.status(200).send(total.toString());
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            })
    },
    mostPopularDestination: (req, res, next) => {
        //TODO:: paginate
        let flights_limit_override = "10000";
        let full_query = flights_endpoint.concat('?', flights_recource, '&limit=', flights_limit_override, '&', city_name_filter);
        let counts = [];
        axios.get(full_query)
        .then((response) => {
            let records = response.data.result.records;
            let current_max = 0;
            let most_popular = '';
            records.forEach(function (x) { 
                if(!x.CHLOC1T) {
                    return;
                }

                counts[x.CHLOC1T] = (counts[x.CHLOC1T] || 0) + 1;
                if(current_max < counts[x.CHLOC1T] && most_popular != x.CHLOC1T){
                    current_max = counts[x.CHLOC1T];
                    most_popular = x.CHLOC1T;
                }
            });

            res.status(200).send(most_popular);
        }).catch((error) => {
            res.sendStatus(error.response.status);
        });
    }
}

module.exports = services;