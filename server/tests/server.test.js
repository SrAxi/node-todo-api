const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /api/todos', () => {
    it('should create a new Todo', (done) => {
        const sampleText = 'Test Todo';

        request(app)
            .post('/api/todos')
            .set('x-auth', users[0].tokens[0].token)
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
            .post('/api/todos')
            .set('x-auth', users[0].tokens[0].token)
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

describe('GET /api/todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/api/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /api/todos/:id', () => {
    it('should get the todo by id', (done) => {
        request(app)
            .get(`/api/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should not return a todo created by another user', (done) => {
        request(app)
            .get(`/api/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const testId = new ObjectId();
        request(app)
            .get(`/api/todos/${testId.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get('/api/todos/123abc')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /api/todos/:id', () => {
    it('should remove a todo', (done) => {
        const idToBeRemoved = todos[1]._id.toHexString();
        request(app)
            .delete(`/api/todos/${idToBeRemoved}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(idToBeRemoved);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(idToBeRemoved).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not remove a todo from another user', (done) => {
        const idToBeRemoved = todos[0]._id.toHexString();
        request(app)
            .delete(`/api/todos/${idToBeRemoved}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(idToBeRemoved).then((todo) => {
                    expect(todo).not.toBeNull();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return a 404 if todo not found', (done) => {
        const testId = new ObjectId();
        request(app)
            .delete(`/api/todos/${testId.toHexString()}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .delete('/api/todos/123abc')
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /api/todos/:id', () => {
    it('should update a todo', (done) => {
        const idToBeUpdated = todos[0]._id.toHexString();
        const text = 'updated text';
        request(app)
            .patch(`/api/todos/${idToBeUpdated}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                'completed': true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).not.toBeNull();
            })
            .end(done);
    });

    it('should not update a todo created by another user', (done) => {
        const idToBeUpdated = todos[0]._id.toHexString();
        const text = 'updated text';
        request(app)
            .patch(`/api/todos/${idToBeUpdated}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                'completed': true,
                text
            })
            .expect(404)
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        const idToBeUpdated = todos[1]._id.toHexString();
        const text = 'updated text';
        request(app)
            .patch(`/api/todos/${idToBeUpdated}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                'completed': false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const testId = new ObjectId();
        request(app)
            .patch(`/api/todos/${testId.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .patch('/api/todos/123abc')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('GET /api/users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/api/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 404 if not authenticated', (done) => {
        request(app)
            .get('/api/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /api/users', () => {
    it('should create a user', (done) => {
        const email = 'example@test.com';
        const password = '123abc!';

        request(app)
            .post('/api/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return validation errors if request is invalid', (done) => {
        const email = 'wrongEmail';
        const password = '123';

        request(app)
            .post('/api/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create user if email is in use', (done) => {
        request(app)
            .post('/api/users')
            .send({
                email: users[0].email,
                password: 'Password123!'
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /api/users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toMatchObject({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            })

    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: users[1].email,
                password: 'wrongPassword'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).not.toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('DELETE /api/users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/api/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e))
            })
    });
});