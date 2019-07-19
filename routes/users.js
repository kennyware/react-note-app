const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');

// POST http://localhost:5000/api/users
router.post('/', (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if(!first_name || !last_name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    User.findOne({email}).then(user => {
        if(user){
            return res.status(400).json({msg: 'This email has already been registered.'})
        }

        const newUser = new User({
            first_name,
            last_name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash;
                newUser.save().then(user => {
                    jwt.sign({id: user.id}, config.get('jwt_secret'), {expiresIn: 3600}, (err, token) => {
                        if(err) throw err;
                    
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.first_name.concat(' ', user.last_name),
                                email: user.email
                            }
                        })
                    })
                }).catch(err => {
                    res.status(400).json({msg: 'Something went wrong', error: err.message})
                })
            })
        })

        
    })
})

// DELETE http://localhost:5000/api/users/:id
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id).then(result => {
        result.remove().then(() => {
            res.json({success: true, msg: 'User deleted'})
        })
    }).catch(err => res.json({success: false, msg: 'User not deleted'}))
})

module.exports = router