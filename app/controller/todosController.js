var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var todosModel = require('../model/todosModel');
var userModel = require('../model/userModel');

// --------------  API GET All ToDos --------------  
// reference: 
// https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-console
// https://stackoverflow.com/questions/40756072/mongoose-find-by-objectid
exports.get_todos_lists = function (req, res, next) {
    async.parallel({
        // Async Tasks
        Todos: function (callback) {
            todosModel.find({ 'userId': req.decodedUserId })
                .exec(callback);
        }
    }, function (err, results) {
        // Async Callback
        if (err) { return res.send(500).send(results); }

        // Success.HTTP 200 & todo results
        return res.status(200).send(results.Todos);
    });
}

// WIP
// reference: 
// https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
exports.post_todo_by_username = function (req, res, next) {
    userModel.findOne({ 'username': req.params.username })
        .then(function (user) {
            if (user) {
                console.log(user._id);
                if (req.params.username === req.decodedUsername) {
                    todosModel.find({ 'userId': user._id })
                        .then(function (todos) {
                            //console.log(todos);
                            if (todos) {
                                console.log('aa');
                                return res.status(200).send(todos);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            if (err) { return next(err); }
                        });
                } else {
                    console.log('WIP: WHEN USER SEE OTHER PROFILE');
                }
            } else {
                return res.status(404).send({message:"username not found"});
            }
        }).catch(function (err) {
            if (err) { return next(err); }
        });

    return res.sendStatus(404);
}

// --------------  API Create ToDo --------------  
exports.get_todo_create = function (req, res, next) {
    let loginDetail = req.params.loginDetail; // dummy var, waiting for login behavior 

    userModel.find({ 'username': new RegExp(loginDetail, 'i') }, 'username _id', function (err, results) {
        if (err) {
            return res.status(500).send(err);
        }
        // Success, return username info
        res.status(200).send(results);
    });
}

exports.post_todo_create = [

    body('title').trim(),
    body('list').trim(),
    body('date_of_created').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('*').trim().escape(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('list').trim().escape(),
    sanitizeBody('date_of_created').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        let createTodo = new todosModel({
            title: req.body.title,
            date_of_created: req.body.date_of_created,
            list: req.body.list,
            userId: req.decodedUserId,
        });

        if (!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else {
            //console.log(createTodo);
            createTodo.save(function (err, success) {
                if (err) {
                    console.error('DB Save error !!', err);
                    return res.status(400).send(err);
                }

                res.status(201).send(success);
            });
        }
    }
];

// --------------  API Delete ToDo --------------  
exports.get_todo_delete = function (req, res, next) {
    let userSession = req.query.user; // user ObjectId temp variable, get from JWT auth.

    async.parallel({
        // Async Tasks
        Todo: function (callback) {
            todosModel.find({ 'userId': userSession })
                .exec(callback);
        }
    }, function (err, results) {
        // Async Callback
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send(results.Todo);
    });
}

exports.post_todo_delete = function (req, res, next) {
    res.send('not yet implemented! (Delete Todo)');
}

// --------------  API Update ToDo --------------  
exports.post_todo_modify = function (req, res, next) {
    res.send('not yet implemented! (Update Todo)');
}

exports.get_todo_modify = function (req, res, next) {
    res.send('not yet implemented! (Update Todo)');
}

// --------------  API GET Single Detail ToDo --------------  
exports.get_todos_detail = function (req, res, next) {
    let todoId = req.params.id;
    res.send('this GET API card detail for ID: ' + todoId);
}

exports.test_get_auth = function (req, res, next) {
    console.log(req.decodedUserId);
    res.sendStatus(200);
}

