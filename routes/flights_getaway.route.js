//modules
const express = require("express");

//internal
const {flightGetAwayController} = require("../controllers");

//navigation
const router = express.Router({
    strict: true,
});

router.get("/", (req, res, next) => {
    flightGetAwayController.get(req, res, next);
});

module.exports = router;