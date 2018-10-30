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

    sanitizeBody('*').trim().escape(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('list').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let createTodo = new todosModel({
            title: req.body.title,
            list: req.body.list,
            userId: req.decodedUserId,
        });

        if (!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else {

            createTodo.save(function (err, success) {
                if (err) {
                    console.error('DB Save error !!', err);
                    return res.status(400).send(err);
                }

                res.status(201).send(success);
            });

            // console.log(createTodo);
            // console.log('debug todo create'); //debug only
            // return res.sendStatus(200);
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

// route for set a todo public or no
// only require isPublic:true/false in request body
// ref: https://stackoverflow.com/questions/37267042/mongoose-findoneandupdate-updating-multiple-fields
exports.post_todo_setpublic = function (req, res, next) {
    todosModel.findOne({ _id: req.params.id, userId: req.decodedUserId })
        .then(function (todo) {
            if (todo) {
                todosModel.findOneAndUpdate({ "_id": req.params.id },
                    {
                        "$set": {
                            "isPublic": req.body.isPublic
                        }
                    }, {}, function (err, thetodo) {
                        if (err) { return next(err); }
                        res.status(200).send(thetodo);
                    });
            }
        }).catch(function (err) {
            if (err) { return next(err); }
        });

    //res.sendStatus(200);
}

// --------------  API GET Single Detail ToDo --------------  
exports.get_todos_detail = function (req, res, next) {
    let todoId = req.params.id;

    todosModel.findOne({ _id: todoId, userId: req.decodedUserId}, function(err, results) {
        // TODO: Need proper error handling
        if(err) { return next(err); }
        
        res.status(200).send(results);
    });
}

exports.test_get_auth = function (req, res, next) {
    console.log(req.decodedUserId);
    res.sendStatus(200);
}

