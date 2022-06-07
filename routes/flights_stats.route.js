//modules
const express = require("express");

//internal
const {flightStatsController} = require("../controllers");

//navigation
const router = express.Router({
    strict: true,
});

router.get("/totalFlights", (req, res, next) => {
    flightStatsController.totalFlights(req, res, next);
});

module.exports = router;