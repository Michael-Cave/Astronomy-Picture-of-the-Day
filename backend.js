// API Key import, DO. NOT. DELETE!
require('dotenv').config();
const apiKey = process.env.API_KEY;

const fetch = require('node-fetch');

async function fetchAstronomyPic(apiKey) {
    return []
}

function safelyExtractKey(response, key) {
    if (response && response.hasOwnProperty(key)) {
        return response[key]
    } else {
        
    }
}




module.exports = ( fetchAstronomyPic );