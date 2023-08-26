const jwt = require('jsonwebtoken');

const UserSchema = require('../models/user');

module.exports = function (req, res, next) {

    const token = req.header('Authorization');

    if (!token || token === null) { return res.status(401).send("Unauthorized You Don\'t have token") }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (e) {
        res.status(401).send('Invalid Token');
    }

}