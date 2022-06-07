//service
const {flightStatsService} = require("../services");

//controller
let controllers = {
    totalFlights: (req, res, next) => {
        flightStatsService.totalFlights(req, res, next);
    }
}

module.exports = controllers;