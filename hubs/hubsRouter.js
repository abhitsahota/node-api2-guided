// router object for all /api/hubs call/handlers/middleware/endpoint

const express = require('express')
const Hubs = require('./hubs-model')
const shortid = require('shortid')

const router = express.Router()

router.use(express.json())

let hubs = []
let lessons = []


router.get('/', (req, res) => {
    res.json({message: 'hello'})
})

router.post('/', (req, res) => {
    const hubInfo = req.body
    hubs.push(hubInfo)

    hubInfo.id = shortid.generate()

    res.status(201).json(hubInfo)
})


router.get('/', (req, res) => {
    res.status(200).json(hubs)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    const found = hubs.find(item => item.id === id )
    if (found) {
        hubs = hubs.filter(hub => hub.id !== id)
        res.status(200).json(found)
    } else {
        res.status(404).json({msg: "not found"})
    }
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    let found = hubs.find(item => item.id === id )
    if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({msg: "not found"})
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    let index = hubs.findIndex(item => item.id === id )
    if (found) {
        hubs[index] = changes
        res.status(200).json(hubs)
    } else {
        res.status(404).json({msg: "not found"})
    }
})

module.exports = router