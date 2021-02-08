const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const AYLIENTextAPI = require('aylien_textapi');
const dotenv = require('dotenv');

dotenv.config();

const json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
});

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

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

textapi.sentiment({
    'text': 'John is a very good football player!'
}, function (error, response) {
    if (error === null) {
        console.log(response);
    }
});