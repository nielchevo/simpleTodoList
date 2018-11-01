var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const mongoose = require('mongoose');

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

exports.post_todo_delete = function (req, res, next) {
    try{
        todosModel.findOneAndDelete({ _id: req.params.id, userId: req.decodedUserId }, 
            { /* Options */ },
            function(err, results) {
                if(err) { 
                    return res.sendStatus(404).send(err);
                }
    
                if(results == null){
                    return res.status(500).send('No such ID exist !');
                }
    
                res.status(200).send("Todo with title ("+ results.title +") and _ID ("+ results._id +") successfully deleted !");
        });
    }
    catch(error) {
        console.log(error);
    }
}

// --------------  API Update ToDo --------------  
// reference: https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34
exports.post_todo_modify = [

    body('title').trim(),
    body('list').trim(),

    sanitizeBody('*').trim().escape(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('list').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else {
            let id = req.params.id;
            if (mongoose.Types.ObjectId.isValid(id)) {
                todosModel.findByIdAndUpdate(id,
                    {
                        "$set": {
                            title: req.body.title,
                            list: req.body.list,
                            isPublic: req.body.isPublic
                        }
                    }).then(function (todo) {
                        if (todo) {
                            return res.status(204).send(todo);
                        } else {
                            return res.status(404).send({ error: "todo with that id didn't exists" });
                        }
                    }).catch(function (err) {
                        if (err) { return next(err); }
                    });
            } else {
                return res.status(500).send({ error: "incorrect id" });
            }
        }
    }
];

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

