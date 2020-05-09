const app = require('./server')


const PORT = 5000 // TCP port


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})