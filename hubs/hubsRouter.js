// router object for all  call/handlers/middleware/endpoint

const express = require('express')
const Hubs = require('./hubs-model')

const router = express.Router()

router.use(express.json())

let hubs = []
let lessons = []


router.get('/', (req, res) => {
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to da  tabase
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  router.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
  });
  
  router.get('/:id/messages', (req, res) => {
    Hubs.findHubMessages(req.params.id)
    .then(msgs => {
        if (msgs.length > 0) {
            res.status.json(msgs)
        } else {
            res.status(404).json({ message: 'no messages found' })
        }
    })
    .catch(e => res.status(500).json(e))  
  })

  router.post('/:id/messages', (req, res) => {
    try {
        if (req.body) {
            Hubs.addMessage(req.body)
            res.status.json(req.body)
        } else {
            res.status(400).json({ message: 'Message information incomplete. Request could not be completed' })
        }
    }  
    catch {
        res.status(500).json({ message: 'Erroring uploading the message' })
    }
    
  })


  router.post('/', (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });
  
  router.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });

module.exports = router