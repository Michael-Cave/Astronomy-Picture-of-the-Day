// API Key import, DO. NOT. DELETE!
require('dotenv').config();
const fetch = require('node-fetch');

const apiKey = process.env.API_KEY || 'DEMO_KEY';
const astronomyPicURL = 'https://api.nasa.gov/planetary/apod'
const APOD_START_DATE = '1995-06-16'



function getCurrentDate() {
    const today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let year = today.getFullYear();

    return `${year}-${month}-${day}`
}

// Returns a bool for future use
function isValidPastDate(date) {
    let userDateObject = new Date(date);
    let startDateObject = new Date(APOD_START_DATE);

    if (userDateObject.getTime() < startDateObject.getTime()) {
        return false
    } else {
        return true
    }
}

// Returns a bool for future use
function isFutureDate(date) {
    let userDateObject = new Date(date);
    let endDateObject = new Date(getCurrentDate())

    if (userDateObject.getTime() > endDateObject.getTime()) {
        return false
    } else {
        return true
    }
}



async function fetchAstronomyPic(date = getCurrentDate()) {
    try {const response = await fetch(`${astronomyPicURL}?api_key=${apiKey}&date=${date}`)
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




module.exports = {
    fetchAstronomyPic,
    getCurrentDate,
    isValidPastDate,
    isFutureDate
};