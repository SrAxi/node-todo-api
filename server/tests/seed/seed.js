const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectId();
const useTwoId = new ObjectId();
const users = [
    {
        _id: userOneId,
        email: 'test1@example.com',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId.toHexString(), access: 'auth' }, 'Odin is knowledge').toString()
            }
        ]
    },
    {
        _id: useTwoId,
        email: 'test2@example.com',
        password: 'userTwoPass',
    }
];

const todos = [
    {
        _id: new ObjectId(),
        text: 'first test todo'
    },
    {
        _id: new ObjectId(),
        text: 'second test todo',
        completed: true,
        completedAt: 123
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