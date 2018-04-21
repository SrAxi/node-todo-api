const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
    {
        _id: userOneId,
        email: 'test1@example.com',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId.toHexString(), access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'test2@example.com',
        password: 'userTwoPass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userTwoId.toHexString(), access: 'auth' }, process.env.JWT_SECRET).toString()
            }
        ]
    }
];

const todos = [
    {
        _id: new ObjectId(),
        text: 'first test todo',
        _creator: userOneId
    },
    {
        _id: new ObjectId(),
        text: 'second test todo',
        completed: true,
        completedAt: 123,
        _creator: userTwoId
    }
];

const populateTodos = ((done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
});

const populateUsers = ((done) => {
    User.remove({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo]);
        })
        .then(() => done());
});

module.exports = { todos, populateTodos, users, populateUsers };