const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
    {
        _id: new ObjectId(),
        text: 'first test todo'
    },
    {
        _id: new ObjectId(),
        text: 'second test todo'
    }
];

beforeEach((done) => {
    // Emptying Todos in the DB
    Todo.remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        const sampleText = 'Test Todo';

        request(app)
            .post('/todos')
            .send({ text: sampleText })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(sampleText);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text: sampleText })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(sampleText);
                        done();
                    })
                    .catch((e) => done(e));
            })
    });

    it('should not create Todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get the todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const testId = new ObjectId();
        request(app)
            .get(`/todos/${testId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});