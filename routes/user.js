const express = require("express");
const router = express.Router();

const SHA256 = require('crypto-js/sha256')
const encBase64 = require('crypto-js/enc-base64')
const uid2 = require('uid2')

const User = require('../models/User')

router.post("/users/signup", async (req, res) => {
    try {
        const { userName, email, password } = req.fields

        if (!userName || !email || !password) {
            throw new Error(' All fields are required, (userName, email, password)')
        }
        
        const user = await User.findOne({email})

        if (user) {
            return res.json({message: 'User already exists'})
        }

        const salt = uid2(64)
        const hash = SHA256(password + salt).toString(encBase64)
        const token = uid2(64)
        
        const newUser = new User({
            userName,
            email,
            salt,
            hash,
            token
        })

        await newUser.save()

        res.json({message: "user successfully created", userName, email, token})
    } catch (error) {
        console.log('error', error)
        res.status(400).json({message: error.message})
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.fields

        if (!email || !password) {
            throw new Error(' All fields are required, (email, password)')
        }

        const user = await User.findOne({email})
        
        if (!user) {
            return res.json({message: "incorrect password or email"})
        }

        const hash = SHA256(password + user.salt).toString(encBase64)

        if (hash !== user.hash) {
            return res.json({message: "incorrect password or email"}) 
        }

        res.json({userName: user.userName, email: user.email, token: user.token})
    } catch (error) {
        console.log('error', error)
        res.status(400).json({message: error.message})
    }
})

module.exports = router