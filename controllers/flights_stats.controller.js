//service
const {flightStatsService} = require("../services");

//controller
let controllers = {
    totalFlights: (req, res, next) => {
        flightStatsService.totalFlights(req, res, next);
    },
    totalInboundFlights: (req, res, next) => {
        flightStatsService.totalInboundFlights(req, res, next);
    },
    totalOutboundFlights: (req, res, next) => {
        flightStatsService.totalOutboundFlights(req, res, next);
    },
    delayedFlights: (req, res, next) => {
        flightStatsService.totalDelayes(req, res, next);
    },
    popularFlights: (req, res, next) => {
        flightStatsService.mostPopularDestination(req, res, next);
    }
}

module.exports = controllers;