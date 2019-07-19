const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');

// POST http://localhost:5000/api/auth
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({ msg: 'Please enter all fields.'})
    }

    User.findOne({email}).then(user => {
        if(!user) return res.json({msg: 'No user was found with that email.'})

        bcrypt.compare(password, user.password).then(match => {
            if(!match) return res.json({msg: 'Invalid password'})
            
            jwt.sign({id: user.id}, config.get('jwt_secret'), {expiresIn: 3600}, (err, token) => {
                if(err) throw err;
            
                res.json({token, user: {name: user.first_name.concat(' ',user.last_name)}})
            })
        })
    })  
})

// GET http://localhost:5000/api/auth/refresh
router.get('/refresh', auth, (req, res) => {
    const user = req.user;
    console.log(user)
    jwt.sign({id: user.id}, config.get('jwt_secret'), {expiresIn: 3600}, (err, token) => {
        if(err) throw err;
    
        res.json({token})
    })
})

// http://localhost:5000/api/auth/user
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => {
        res.json({user})
    })
})

module.exports = router