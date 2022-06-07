//modules
const express = require("express");

//internal
const {flightStatsController} = require("../controllers");

//navigation
const router = express.Router({
    strict: true,
});

router.get("/total", (req, res, next) => {
    flightStatsController.totalFlights(req, res, next);
});

router.get("/inbound", (req, res, next) => {
    flightStatsController.totalInboundFlights(req, res, next);
});

router.get("/outbound", (req, res, next) => {
    flightStatsController.totalOutboundFlights(req, res, next);
});

router.get("/delayed", (req, res, next) => {
    flightStatsController.delayedFlights(req, res, next);
})

router.get("/popular", (req, res, next) => {
    flightStatsController.popularFlights(req, res, next);
})

module.exports = router;