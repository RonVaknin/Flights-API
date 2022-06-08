//server
const express = require('express');
const app = express();
const port = 3000;

//internal
const { flightStats, flightGetAway} = require("./routes");

app.use(express.json());

app.use("/flights/stats", flightStats);
app.use("/flights/getaway", flightGetAway)

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});