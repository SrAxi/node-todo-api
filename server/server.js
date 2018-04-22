require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const { setHeaders } = require('./middleware/headers');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(setHeaders);
app.use('/apidoc', express.static(__dirname + '/public/apidoc'));

/**
 * POST /api/todos
 *
 * @api {post} /api/todos Creates new Todos
 * @apiName PostTodos
 * @apiGroup Todos
 *
 * @apiParam {String} text The text of the Todo.
 *
 * @apiSuccess {Boolean} completed If the Todo has been completed.
 * @apiSuccess {Number} completedAt The timestamp of when the Todo was completed.
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} text The text of the Todo.
 * @apiSuccess {Number} _creator Unique ID of the User that created the Todo.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "completed": false,
     "completedAt": null,
     "_id": "5adc788e9a24bf33dca63d7f",
     "text": "Sample Todo",
     "_creator": "5adc733fcc2dd01cfcd0f1ab",
 }
 */
app.post('/api/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

/**
 * GET /api/todos
 *
 * @api {get} /api/todos Gets all the Todos
 * @apiName GetTodos
 * @apiGroup Todos
 *
 * @apiSuccess {Object[]} todos  List of Todos.
 *
 * @apiSuccessExample {json} Success-Response:
 {
    "todos": [
        {
            "completed": false,
            "completedAt": null,
            "_id": "5adc7343cc2dd01cfcd0f1ad",
            "text": "Sample Todo",
            "_creator": "5adc733fcc2dd01cfcd0f1ab",
        },
        {
            "completed": false,
            "completedAt": null,
            "_id": "5adc788e9a24bf33dca63d7f",
            "text": "Another example Todo",
            "_creator": "5adc733fcc2dd01cfcd0f1ab",
        }
    ]
}
 */
app.get('/api/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    })
});

/**
 * GET /api/todos/:id
 *
 * @api {get} /api/todos:id Gets a Todo
 * @apiName GetTodoById
 * @apiGroup Todos
 *
 * @apiParam {Number} _id The Unique ID of the Todo
 *
 * @apiSuccess {Boolean} completed If the Todo has been completed.
 * @apiSuccess {Number} completedAt The timestamp of when the Todo was completed.
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} text The text of the Todo.
 * @apiSuccess {Number} _creator Unique ID of the User that created the Todo.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "todo": {
         "completed": false,
         "completedAt": null,
         "_id": "5adc70c7e40bf73a1c8e6ffa",
         "text": "Sample Todo",
         "_creator": "5adc70bfe40bf73a1c8e6ff8",
     }
 }
 */
app.get('/api/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(() => res.status(400).send())
});

/**
 * DELETE /api/todos/:id
 *
 * @api {delete} /api/todos:id Deletes a Todo
 * @apiName DeleteTodoById
 * @apiGroup Todos
 *
 * @apiParam {Number} _id The Unique ID of the Todo
 *
 * @apiSuccess {Boolean} completed If the Todo has been completed.
 * @apiSuccess {Number} completedAt The timestamp of when the Todo was completed.
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} text The text of the Todo.
 * @apiSuccess {Number} _creator Unique ID of the User that created the Todo.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "todo": {
         "completed": false,
         "completedAt": null,
         "_id": "5adc70c7e40bf73a1c8e6ffa",
         "text": "Sample Todo",
         "_creator": "5adc70bfe40bf73a1c8e6ff8",
     }
 }
 */
app.delete('/api/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(() => res.status(400).send());
});

/**
 * PATCH /api/todos/:id
 *
 * @api {patch} /api/todos:id Updates a Todo
 * @apiName UpdateTodoById
 * @apiGroup Todos
 *
 * @apiParam {Number} _id The Unique ID of the Todo
 * @apiParam {Boolean} completed If the Todo has been completed.
 * @apiParam {String} text The text of the Todo.
 *
 * @apiSuccess {Boolean} completed If the Todo has been completed.
 * @apiSuccess {Number} completedAt The timestamp of when the Todo was completed.
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} text The text of the Todo.
 * @apiSuccess {Number} _creator Unique ID of the User that created the Todo.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "todo": {
         "completed": true,
         "completedAt": 1524398235933,
         "_id": "5adc788e9a24bf33dca63d7f",
         "text": "updated text",
         "_creator": "5adc733fcc2dd01cfcd0f1ab",
     }
 }
 */
app.patch('/api/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.send({ todo });
        }).catch(() => res.status(400).send());
});

/**
 * POST /api/users
 *
 * @api {post} /api/users Creates new User
 * @apiName PostUsers
 * @apiGroup Users
 *
 * @apiParam {String} email The email of the new user.
 * @apiParam {String} password The password of the new user.
 *
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} email The email of the new user.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "_id": "5adc790a9a24bf33dca63d82",
     "email": "user@example.com"
 }
 */
app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => res.status(400).send(e))
});

/**
 * GET /api/users/me
 *
 * @api {get} /api/users Get's the current User
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} email The email of the new user.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "_id": "5adc790a9a24bf33dca63d82",
     "email": "user@example.com"
 }
 */
app.get('/api/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

/**
 * POST /api/users/login
 *
 * @api {post} /api/users/login User login
 * @apiName PostUserLogin
 * @apiGroup Users
 *
 * @apiParam {String} email The email of the new user.
 * @apiParam {String} password The password of the new user.
 *
 * @apiSuccess {Number} _id Unique ID.
 * @apiSuccess {String} email The email of the new user.
 *
 * @apiSuccessExample {json} Success-Response:
 {
     "_id": "5adc790a9a24bf33dca63d82",
     "email": "user@example.com"
 }
 */
app.post('/api/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

/**
 * DELETE /api/users/me/token
 *
 * @api {delete} /api/users/me/token User logout
 * @apiName DeleteUserLogout
 * @apiGroup Users
 */
app.delete('/api/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started on port: ${port}`)
});


module.exports = { app };
