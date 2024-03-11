// API Key import, DO. NOT. DELETE!
require('dotenv').config();
const apiKey = process.env.API_KEY || 'DEMO_KEY';

const fetch = require('node-fetch');

async function fetchAstronomyPic(apiKey) {
    try {const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        const jsonResponse = await response.json()
        return jsonResponse
    } catch (error) {
        console.log(`Exiting with error: ${error}`)
        throw error
    }
}

function safelyExtractKey(response, key) {
    if (response && response.hasOwnProperty(key)) {
        return response[key]
    } else {
        
    }
}




module.exports = { fetchAstronomyPic };