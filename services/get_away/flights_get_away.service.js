//modules
const axios = require("axios");

//api variables
const flights_endpoint = "action/datastore_search";
const flights_recource = "resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5";
const sort_by_date = "sort=CHSTOL asc";
const query_fields = "fields=CHPTOL,CHOPER,CHFLTN,CHCINT";
const flights_query = "?" + flights_recource + '&' + sort_by_date + '&' + query_fields;


const services = {
    totalFlights: async (req, res, next) => {
        //query data
        let full_query = flights_endpoint.concat(flights_query);
        let total = 0;
        let offset = 0;
        let limit = 500;
        let flights_limit = "";
        let flights_offset = "";
        let flight_date = 0;
        let current_time = Date.now();
        let max_wait_time = current_time + (60 * 60 * 5); //five hours max for the nearest flight.

        // flights data
        let inbound_flight_code = "";
        let inbound_flight_date = 0;
        let outbound_flight_code = "";
        let outbound_flight_date = 0;

        do{
            flights_limit = "&limit="+limit;
            flights_offset = "&offset="+offset;

            let current_query = full_query.concat(flights_limit, flights_offset);
            await axios.get(current_query)
                .then((response) => {
                    let data = response.data;
                    total = data.result.total;
                    offset = offset + limit;

                    let is_inbound = false;
                    let records = data.result.records;
                    console.log(records.length);

                    records.forEach(function (x) { 
                        //TODO:: break loop by throwing exception with try - catch
                        // if((outbound_flight_date !== 0 && inbound_flight_date !== 0)) {
                        //     return;
                        // }

                        let flight_date = Date.parse(x.CHPTOL);

                        //within time limit
                        if(current_time > flight_date && max_wait_time < flight_date) {
                            return;
                        }

                        //is inbound flight
                        if(!x.CHCINT) {
                            is_inbound = true;
                        }

                        console.log(inbound_flight_date)
                        //set inbound flight get away
                        if(is_inbound) {
                            if(inbound_flight_date !== 0) {
                                return;
                            }

                            inbound_flight_date = flight_date;
                            inbound_flight_code = x.CHOPER.concat(x.CHFLTN);
                        } else { //set outbound flight get away
                            if(outbound_flight_date !== 0) {
                                return;
                            }

                            outbound_flight_date = flight_date;
                            outbound_flight_code = x.CHOPER.concat(x.CHFLTN);
                        }
                    });
        
                    
                })
                .catch((error) => {
                    console.warn(error);
                    res.sendStatus(error.response.status);
                });
                
        } while ( (total < limit + offset && current_time > flight_date) || (outbound_flight_date !== 0 && inbound_flight_date !== 0) );

console.log( outbound_flight_code + " " + inbound_flight_code + " " + outbound_flight_code + " " + inbound_flight_code);

        let result = {};
        if(outbound_flight_code){
            result.departure = outbound_flight_code;
        }

        if(inbound_flight_code){
            result.arrival = inbound_flight_code;
        }

        res.status(200).send(JSON.stringify(result));
    }
}

module.exports = services;