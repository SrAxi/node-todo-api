Node.js API for a Todo application
===================

This is a project that exposes a RESTful API for a Todo application.

Check the [API docs](https://infinite-island-37700.herokuapp.com/apidoc/)!

----------


Usage
-------------

The usage of this API is destined to a Todo Application that I'll developer with VueJs. *(Stay tuned!)*

If you want to use it for your own projects, follow these instructions:

Clone the repository

    git clone git@github.com:SrAxi/node-todo-api.git


Install dependencies using [npm](https://www.npmjs.com/)

    npm install

Create a `config.json` file in `server/config` path, add the following content:
```
{
  "test": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:<port>/<test DB name>",
    "JWT_SECRET": "<secret>"
  },
  "development": {
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:<port>/<dev DB name>",
    "JWT_SECRET": "<secret>"
  }
}

```
Fill the content between `<>` with your own content.

Run MongoDB
```
cd path-to-MongoDB/Server/<version>/bin
mongod.exe
```

Run the Server

    npm start

Run unit tests

    npm test



Technologies
-------------

 - NodeJs
 - ExpressJs
 - MongoDB
 - Mongoose
 - Mocha
 - Supertest
 - Expect
 - [APIdoc](http://apidocjs.com)

