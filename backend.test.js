const { fetchAstronomyPic } = require('./backend')
require('dotenv').config();
const apiKey = process.env.API_KEY
const fetch = require('node-fetch')


test('copyright is present', async () => {
    const input = apiKey
    const result = await fetchAstronomyPic(input)
    const expectedProperty = 'copyright';
    expect(result).toHaveProperty(expectedProperty);
})