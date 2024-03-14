const { fetchAstronomyPic, getCurrentDate, isValidPastDate, isFutureDate } = require('./backend')
require('dotenv').config();
const apiKey = process.env.API_KEY
const fetch = require('node-fetch')


test('copyright is present', async () => {
    const result = await fetchAstronomyPic()
    const expectedProperty = 'copyright';

    expect(result).toHaveProperty(expectedProperty);
})

test('accepts alternative date', async () => {
    const input = '2012-10-04'
    const result = await fetchAstronomyPic(input)
    const expectedProperty = 'copyright';

    expect(result).toHaveProperty(expectedProperty);
})

test('current date is a string', () => {
    const result = getCurrentDate()

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
})

test('date is before start date', () => {
    const input = '1990-06-13'
    const result = isValidPastDate(input)
    const expectedValue = false

    expect(result).toBe(expectedValue);
})

test('date is after start date', () => {
    const input = '2012-10-04'
    const result = isValidPastDate(input)
    const expectedValue = true

    expect(result).toBe(expectedValue);
})

test('date is before current date', () => {
    const input = '2012-10-04'
    const result = isFutureDate(input)
    const expectedValue = true

    expect(result).toBe(expectedValue);
})

test('date is after current date', () => {
    const input = '2030-07-04'
    const result = isFutureDate(input)
    const expectedValue = false

    expect(result).toBe(expectedValue);
})