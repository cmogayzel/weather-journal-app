const { response } = require("express");
const { request } = require("http");

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

//start server
const server = app.listen(port,listening)

function listening() {
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}


//get function 
app.get('/all', sendData)

function sendData(req, res) {
    res.send(projectData);
}

//Route POST
app.post('/weatherData',postData);

function postData(req,res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.bod.date;
    projectData.user_response = req.body.user_response;
    res.end();
    console.log(projectData);
}