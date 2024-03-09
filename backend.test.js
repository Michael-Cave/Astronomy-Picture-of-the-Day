const { fetchAstronomyPic } = require('./backend')
require('dotenv').config();
const apiKey = process.env.API_KEY


test('copyright is present', async () => {
    const input = apiKey
    const result = await fetchAstronomyPic(input)
    const expected = 'copyright';
    expected(result).toHaveProperty(expected);
})