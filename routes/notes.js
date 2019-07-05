const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GET http://localhost:5000/api/notes
router.get('/', auth, (req, res) => {

    User.findById(req.user.id).then(user => {
        const username = user.first_name.concat(' ', user.last_name);
        Note.find({author: username}).then(notes => {
            if(notes.length > 0 || notes != '') {
                res.json(notes)
            } else {
                res.json({msg: 'You have no notes.'})
            }
        })
    })

    
})

// GET http://localhost:5000/api/notes/:id
router.get('/:id', auth, (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note)
    }).catch(err => {
        res.status(404).json({error: 'Nothing was found with that id'})
    })
})

// POST http://localhost:5000/api/notes
router.post('/', auth, (req, res) => {

    User.findById(req.user.id).then(user => {
        const username = user.first_name.concat(' ', user.last_name);
        const newNote = new Note({
            author: username,
            description: req.body.description
        })
    
        newNote.save().then(result => {
            res.json(result)
        }).catch(err => {
            res.status(400).json({msg: 'Something went wrong', error: err.message})
        })
    })
})

// DELETE http://localhost:5000/api/notes/:id
router.delete('/:id', auth, (req, res) => {
    Note.findById(req.params.id).then(result => {
        result.remove().then(() => {
            res.json({success: true, msg: 'Note deleted'})
        })
    }).catch(err => res.json({success: false, msg: 'Note not deleted'}))
})

module.exports = router