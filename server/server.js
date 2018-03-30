const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { Users } = require('./models/users');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

/**
 * POST /todos
 */
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

/**
 * GET /todos
 */
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    })
});

/**
 * GET /todos/:id
 */
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(() => {
        res.status(400).send();
    })
});

/**
 * DELETE /todos/:id
 */
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(() => {
        res.status(400).send();
    });


});

app.listen(port, () => {
    console.log(`Started on port: ${port}`)
});


module.exports = { app };