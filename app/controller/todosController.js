var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var todosModel = require('../model/todosModel');
var userModel = require('../model/userModel');

// --------------  API GET All ToDos --------------  
exports.get_todos_lists = function(req, res, next) {
    async.parallel({
        // Async Tasks
        todos: function(callback) {
            todosModel.find()
                .exec(callback);
        }
    }, function(err, results) {
        // Async Callback
        if(err) { return res.send(500).send(results); }
        
        // Success.HTTP 200 & todo results
        return res.status(200).send(results.todos);
    });
}

// --------------  API Create ToDo --------------  
exports.get_todo_create = function(req, res, next) {
    return res.send('not yet implemented! (create todo)');
}

exports.post_todo_create = [

    body('title').trim(),
    body('userId', 'User must not be empty.').isLength({ min:1 }).trim(),
    body('list').trim(),
    body('date_of_created').optional({checkFalsy: true}).isISO8601(),
    body('visible').isBoolean(),

    sanitizeBody('title').trim().escape(),
    sanitizeBody('userId').trim().escape(),
    sanitizeBody('list').trim().escape(),
    sanitizeBody('date_of_created').toDate(),
    sanitizeBody('visible').toBoolean(),

    (req, res, next) => {
        const errors = validationResult(req);

        let createTodo = new todosModel ({
            title           : req.body.title,
            date_of_created : req.body.date_of_created,
            list            : [{
                                content: req.body.list
                            }],
            userId          : req.body.userId,
            isPublic        : req.body.visible
        });

        if(!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else{
            createTodo.save(function(err, success) {
                if(err){
                    console.error('DB Save error !!', err);
                    return res.status(400).send(err);
                }
                
                res.status(201).send(success);
            });
        }
    }
];

// --------------  API Delete ToDo --------------  
exports.get_todo_delete = function(req, res, next) {
    res.send('not yet implemented! (Delete Todo)');
}

exports.post_todo_delete = function (req, res, next) {
    res.send('not yet implemented! (Delete Todo)');
}

// --------------  API Update ToDo --------------  
exports.post_todo_modify = function(req, res, next) {
    res.send('not yet implemented! (Update Todo)');
}

exports.get_todo_modify = function(req, res, next) {
    res.send('not yet implemented! (Update Todo)');
}

// --------------  API GET Single Detail ToDo --------------  
exports.get_todos_detail = function(req, res, next) {
    let todoId = req.params.id;
    res.send('this GET API card detail for ID: '+ todoId);
}

