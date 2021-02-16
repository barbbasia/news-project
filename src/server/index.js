projectData = {};
const path = require('path')

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
let apiKey = process.env.API_KEY;
let inputURL = "";

const fetch = require('node-fetch');

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(8081, function () {
    console.log('Listening on port 8081!');
})


// Post
app.post('/meaningCloud', addMC);

async function addMC(req, res) {

    inputURL = req.body.url;

    const response = await fetch(`${baseURL}${apiKey}&url=${inputURL}&lang=en`)

    try {
        const meaningData = await response.json()
        const projectData = {
            input_text: inputURL,
            score_tag: meaningData.score_tag,
            agreement: meaningData.agreement,
            subjectivity: meaningData.subjectivity,
            confidence: meaningData.confidence,
            irony: meaningData.irony
        }
        console.log(projectData);
        res.send(projectData);
    } catch (error) {
        console.log('error', error);
    }
}
