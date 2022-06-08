//modules
const axios = require('axios');

//internal
const flightStatsService = require("./flights_stats/flights_stats.service");
const flightsGetAwayService = require("./get_away/flights_get_away.service");

//api variables
const base_url = "https://data.gov.il/";
const flights_api_version = "api/3/";

axios.defaults.baseURL = `${base_url}/${flights_api_version}`;

module.exports = {flightStatsService, flightsGetAwayService};
