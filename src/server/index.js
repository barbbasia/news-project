projectData = {};
const path = require('path')

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

// Require Fetch
const fetch = require('node-fetch');

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Listening on port 8081!');
})


// Post
app.post('/meaningCloud', addMC);

async function addMC(req, res) {

    inputURL = req.body.url;

    const response = await fetch(`${baseURL}${apiKey}&url=${inputURL}&lang=en`)

    try {
        const mcData = await response.json()
        const projectData = {
            input_text: inputURL,
            score_tag: mcData.score_tag,
            agreement: mcData.agreement,
            subjectivity: mcData.subjectivity,
            confidence: mcData.confidence,
            irony: mcData.irony
        }
        console.log(projectData);
        res.send(projectData);
    } catch (error) {
        console.log('error', error);
    }
}
