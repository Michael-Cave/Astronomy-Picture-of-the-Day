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

// Checks to see if the date is before the first APOD date
function isValidPastDate(date) {
    let userDateObject = new Date(date);
    let startDateObject = new Date(APOD_START_DATE);

    if (userDateObject.getTime() < startDateObject.getTime()) {
        return false
    } else {
        return true
    }
}

// Checks if the date is in the future, no pre-cogs allowed in my science apps
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
    try {
        const response = await fetch(`${astronomyPicURL}?api_key=${apiKey}&date=${date}&concept_tags=True`)
        const jsonResponse = await response.json()
        return jsonResponse
    } catch (error) {
        console.log(`Exiting with error: ${error}`)
        throw error
    }
}

function safelyExtractKey(response, key, debugMode=false) {
    if (response && response.hasOwnProperty(key)) {
        return response[key];
    } else {
        if (debugMode) {
            console.log(`Warning: No such key "${key}" found`);
        }
        return null;
    }
}

async function makeWorkableAstronomyObject(date = getCurrentDate()) {
    try {
        if (date !== getCurrentDate()) {
            const checkValidPastDate = isValidPastDate(date);
            const checkFutureDate = isFutureDate(date);
            if (checkValidPastDate === false || checkFutureDate === false) {
                throw new Error(`Temporal anomaly detected: Date is either before APOD inception or in the future...`)
            }
        }

        const response = await fetchAstronomyPic(date);
        const workableObject = {};
        
        workableObject.resource = safelyExtractKey(response, "resource");
        workableObject.conceptTags = safelyExtractKey(response, "concept_tags");
        workableObject.title = safelyExtractKey(response, "title");
        workableObject.date = safelyExtractKey(response, "date");
        workableObject.url = safelyExtractKey(response, "url");
        workableObject.hdurl = safelyExtractKey(response, "hdurl");
        workableObject.mediaType = safelyExtractKey(response, "media_type");
        workableObject.explanation = safelyExtractKey(response, "explanation");
        workableObject.concepts = safelyExtractKey(response, "concepts");
        workableObject.thumbnailURL = safelyExtractKey(response, "thumbnail_url");
        workableObject.copyright = safelyExtractKey(response, "copyright")
        workableObject.serviceVersion = safelyExtractKey(response, "service_version");

        return workableObject
    } catch (error) {
        console.log(`Error while creating object: ${error}`)
        throw error
    }
    

}





module.exports = {
    fetchAstronomyPic,
    getCurrentDate,
    isValidPastDate,
    isFutureDate,
    makeWorkableAstronomyObject
};