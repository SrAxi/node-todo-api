define({
    "api": [
        {
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "optional": false,
                            "field": "varname1",
                            "description": "<p>No type.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "varname2",
                            "description": "<p>With type.</p>"
                        }
                    ]
                }
            },
            "type": "",
            "url": "",
            "version": "0.0.0",
            "filename": "server/doc/main.js",
            "group": "D__CODING_learning_nodeJS_node_todo_api_server_doc_main_js",
            "groupTitle": "D__CODING_learning_nodeJS_node_todo_api_server_doc_main_js",
            "name": ""
        },
        {
            "type": "delete",
            "url": "/api/todos:id",
            "title": "Deletes a Todo",
            "name": "DeleteTodoById",
            "group": "Todos",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>The Unique ID of the Todo</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Boolean",
                            "optional": false,
                            "field": "completed",
                            "description": "<p>If the Todo has been completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "completedAt",
                            "description": "<p>The timestamp of when the Todo was completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_creator",
                            "description": "<p>Unique ID of the User that created the Todo.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"todo\": {\n        \"completed\": false,\n        \"completedAt\": null,\n        \"_id\": \"5adc70c7e40bf73a1c8e6ffa\",\n        \"text\": \"Sample Todo\",\n        \"_creator\": \"5adc70bfe40bf73a1c8e6ff8\",\n    }\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Todos"
        },
        {
            "type": "get",
            "url": "/api/todos:id",
            "title": "Gets a Todo",
            "name": "GetTodoById",
            "group": "Todos",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>The Unique ID of the Todo</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Boolean",
                            "optional": false,
                            "field": "completed",
                            "description": "<p>If the Todo has been completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "completedAt",
                            "description": "<p>The timestamp of when the Todo was completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_creator",
                            "description": "<p>Unique ID of the User that created the Todo.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"todo\": {\n        \"completed\": false,\n        \"completedAt\": null,\n        \"_id\": \"5adc70c7e40bf73a1c8e6ffa\",\n        \"text\": \"Sample Todo\",\n        \"_creator\": \"5adc70bfe40bf73a1c8e6ff8\",\n    }\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Todos"
        },
        {
            "type": "get",
            "url": "/api/todos",
            "title": "Gets all the Todos",
            "name": "GetTodos",
            "group": "Todos",
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Object[]",
                            "optional": false,
                            "field": "todos",
                            "description": "<p>List of Todos.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": " {\n    \"todos\": [\n        {\n            \"completed\": false,\n            \"completedAt\": null,\n            \"_id\": \"5adc7343cc2dd01cfcd0f1ad\",\n            \"text\": \"Sample Todo\",\n            \"_creator\": \"5adc733fcc2dd01cfcd0f1ab\",\n        },\n        {\n            \"completed\": false,\n            \"completedAt\": null,\n            \"_id\": \"5adc788e9a24bf33dca63d7f\",\n            \"text\": \"Another example Todo\",\n            \"_creator\": \"5adc733fcc2dd01cfcd0f1ab\",\n        }\n    ]\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Todos"
        },
        {
            "type": "post",
            "url": "/api/todos",
            "title": "Creates new Todos",
            "name": "PostTodos",
            "group": "Todos",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Boolean",
                            "optional": false,
                            "field": "completed",
                            "description": "<p>If the Todo has been completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "completedAt",
                            "description": "<p>The timestamp of when the Todo was completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_creator",
                            "description": "<p>Unique ID of the User that created the Todo.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"completed\": false,\n    \"completedAt\": null,\n    \"_id\": \"5adc788e9a24bf33dca63d7f\",\n    \"text\": \"Sample Todo\",\n    \"_creator\": \"5adc733fcc2dd01cfcd0f1ab\",\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Todos"
        },
        {
            "type": "patch",
            "url": "/api/todos:id",
            "title": "Updates a Todo",
            "name": "UpdateTodoById",
            "group": "Todos",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>The Unique ID of the Todo</p>"
                        },
                        {
                            "group": "Parameter",
                            "type": "Boolean",
                            "optional": false,
                            "field": "completed",
                            "description": "<p>If the Todo has been completed.</p>"
                        },
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Boolean",
                            "optional": false,
                            "field": "completed",
                            "description": "<p>If the Todo has been completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "completedAt",
                            "description": "<p>The timestamp of when the Todo was completed.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "text",
                            "description": "<p>The text of the Todo.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_creator",
                            "description": "<p>Unique ID of the User that created the Todo.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"todo\": {\n        \"completed\": true,\n        \"completedAt\": 1524398235933,\n        \"_id\": \"5adc788e9a24bf33dca63d7f\",\n        \"text\": \"updated text\",\n        \"_creator\": \"5adc733fcc2dd01cfcd0f1ab\",\n    }\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Todos"
        },
        {
            "type": "delete",
            "url": "/api/users/me/token",
            "title": "User logout",
            "name": "DeleteUserLogout",
            "group": "Users",
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Users"
        },
        {
            "type": "get",
            "url": "/api/users",
            "title": "Get's the current User",
            "name": "GetCurrentUser",
            "group": "Users",
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "email",
                            "description": "<p>The email of the new user.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"_id\": \"5adc790a9a24bf33dca63d82\",\n    \"email\": \"user@example.com\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Users"
        },
        {
            "type": "post",
            "url": "/api/users/login",
            "title": "User login",
            "name": "PostUserLogin",
            "group": "Users",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "email",
                            "description": "<p>The email of the new user.</p>"
                        },
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "password",
                            "description": "<p>The password of the new user.</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "email",
                            "description": "<p>The email of the new user.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"_id\": \"5adc790a9a24bf33dca63d82\",\n    \"email\": \"user@example.com\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Users"
        },
        {
            "type": "post",
            "url": "/api/users",
            "title": "Creates new User",
            "name": "PostUsers",
            "group": "Users",
            "parameter": {
                "fields": {
                    "Parameter": [
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "email",
                            "description": "<p>The email of the new user.</p>"
                        },
                        {
                            "group": "Parameter",
                            "type": "String",
                            "optional": false,
                            "field": "password",
                            "description": "<p>The password of the new user.</p>"
                        }
                    ]
                }
            },
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Number",
                            "optional": false,
                            "field": "_id",
                            "description": "<p>Unique ID.</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "email",
                            "description": "<p>The email of the new user.</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success-Response:",
                        "content": "{\n    \"_id\": \"5adc790a9a24bf33dca63d82\",\n    \"email\": \"user@example.com\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "server/server.js",
            "groupTitle": "Users"
        }
    ]
});
