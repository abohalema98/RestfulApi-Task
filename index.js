const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('./validation/verifyToken');

const booksRouter = require('./router/booksRouter');
const UserRouter = require('./Controllers/userControllers');


// DB Connection
const DB_CONNECTION = require('./config/db.config');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to DB
DB_CONNECTION();

// Error Handling
app.use((err,req, res, next) => {
    res.status(404).send(`<h1 style="color:red" ># ( Page Not Found ) The URL address is incorrect! # </h1>`);
    next(err);
}); 


// Routes
app.get('/', (req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});



app.use('/api', booksRouter);
app.use('/api/auth', UserRouter);


// Error Handling
app.use((error, req, res, next) => {
    res.send(error.message + "");
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

