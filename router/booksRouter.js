const express = require('express');
const booksRouter = express.Router();
const mongoose = require('mongoose');
const verifyToken = require('../validation/verifyToken');

// Book Model
require('../models/books');
const BookSchema = mongoose.model('books');


booksRouter.route('/books')
    // retrive all books
    .get(verifyToken, async (req, res) => {
        await BookSchema.find({})
            .then((data) => { res.send(data) })
            .catch((err) => { res.status(404).send(err) })
    })

    // create a new book
    .post(verifyToken, async (req, res) => {
        const newBook = new BookSchema({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published_year: req.body.year,
        })

        // res.send(newBook)
        await newBook.save()
            .then((data) => { res.status(201).send(data) })
            .catch((err) => { res.status(404).send(err) })

    })

    // Only Update the description of a book
    .put(verifyToken, async (req, res) => {
        await BookSchema.updateOne({ _id: req.body.id }, { $set: { description: req.body.description } })
            .then((data) => { res.send(data) })
            .catch((err) => { res.status(404).send(err) })
    })

    // delete spicific book with ObjectId
    .delete(verifyToken, async (req, res) => {
        await BookSchema.deleteOne({ _id: req.body.id })
            .then((data) => { res.send(data) })
            .catch((err) => { res.status(404).send(err) })
    })

// retrive description of spicific book with ObjectId
booksRouter.post("/books/:id?", verifyToken, async (req, res) => {
    const id = await req.params.id;
    await BookSchema.findById({_id: id})
        .then((data) => { res.json({ "Description": data.description }) })
        .catch((err) => { res.send(err) })

})

module.exports = booksRouter;

