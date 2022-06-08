//service
const { flightsGetAwayService } = require("../services");

//controller
let controllers = {
    get: (req, res, next) => {
        flightsGetAwayService.totalFlights(req, res, next);
    },
}

module.exports = controllers;