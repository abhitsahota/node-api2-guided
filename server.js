const express = require('express')
const server = express()

const hubsRouter = require('./hubs/hubsRouter')

server.use(express.json())
server.use('/api/hubs', hubsRouter)

server.get('/', (req, res) => {
    res.send('hey')
})

module.exports = server