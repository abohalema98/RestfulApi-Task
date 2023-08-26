const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { signValidation, loginValidation } = require("../validation/userValidation")

// User Model
require('../models/user');
const UserSchema = mongoose.model('users');



// login
router.post('/userLogin', async (req, res) => {

    const { error } = loginValidation(req.body);

    if (error) {
        response.status(400).send(error.details[0].message)
    };

    const User = await UserSchema.findOne({ email: req.body.email });

    if (!User) {
        return response.status(400).send(`email doen't  exists `)
    }

    const validPassword = await bcrypt.compare(req.body.password, User.password);

    if (!validPassword) {
        return res.status(400).send(`invalid password`)
    }

    const token = jwt.sign({ id: User._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION })

    User.token = token;

    if (token) {
        User.isActive = true;
        await User.save();
    }

    res.header('Authorization', token).status(201).send({ token: token, isActive: User.isActive })
})


// Sign up
router.post('/userRegister', async (req, res) => {
    const { error } = signValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    };

    const emailExists = await UserSchema.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).send(`email already exists`)
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    let newUser = new UserSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    })

    await newUser.save()
        .then((data) => { res.status(201).json({ message: "user created", data: data }) })
        .catch((err) => { res.status(404).send(err) })
});


// log out
router.post("/logout", async (req, res) => {
    const token = await req.header("Authorization");
    const { id } = await jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await UserSchema.findOne({ _id: id })
    if (!user) {
        return;
    } else {
        user.token = null;
        user.isActive = false;
        await user.save()
        res.status(200).json({ message: "Logged out successfully.", token: user.token });
    }

});

module.exports = router;


