//server
const express = require('express');
const app = express();
const port = 3000;

//internal
const {flightStats} = require("./routes");

app.use(express.json());

app.use("/flights/stats", flightStats);

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});