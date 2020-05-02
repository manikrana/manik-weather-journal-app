// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

const server = app.listen(port, listening);
function listening() {
  console.log(`sever is running at port: ${port}`);
}

//POST Route
app.post("/addWeatherInfo", addWeather);

function addWeather(req, res) {
  console.log(req.body);
  newEntry = {
    date: req.body.date,
    zip: req.body.zip,
    feeling: req.body.feeling,
    temp: req.body.temp,
  };
  projectData = newEntry;
  res.send(projectData);
}

//GET Route
app.get("/getData", sendData);

function sendData(req, res) {
  res.send(projectData);
}
