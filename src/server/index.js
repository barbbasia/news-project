const projectData = {};
const path = require('path')
const mockAPIResponse = require('./mockAPI.js')

// Encrypt your personal API key
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require body-parser
const bodyParser = require('body-parser')

//Configure Express to use body-parser as middle-ware
// to use json:
app.use(bodyParser.json())
// to use url encoded values:
app.use(bodyParser.urlencoded({
    extended: true
}))

// Require Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder called 'dist'
app.use(express.static('dist'))

// setting up the MeaningCloud API
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
let apiKey = process.env.API_KEY;
let inputURL = "";

const json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Listening on port 8081!');
})

