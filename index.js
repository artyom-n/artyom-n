const express = require('express')
const cors = require('cors')
const app = express()
const fetch = require('node-fetch');

app.use(cors())
app.use(express.json())

let startDate = '2020-02-16'
let endDate = '2020-02-17'

app.get(`/api/getPriceHistory/${startDate}/${endDate}`, (req, res) => {
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${startDate}`)
    .then(res => res.json())
    .then(json => res.send(json));
})

// Loop through every "bpi" value in CoinDesk response and multiply it by a thousand
app.get('/api', (req, res) => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => res.json())
    .then(json => Object.entries(json.bpi)
    .forEach(([key, value]) => console
    .log(`${key}: ${(value*1000)
    .toFixed(2)}`)))
})

app.listen(9000, () => {
    console.log('Server running on port 9000')
})
