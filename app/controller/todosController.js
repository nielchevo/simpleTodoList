var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var todosModel = require('../model/todosModel');

exports.get_todos_lists = function(req, res, next) {
    async.parallel({
        todos: function(callback) {
            todosModel.find()
                .exec(callback);
        }
    }, function(err, results) {
        if(err) { return next(res.send(500).send(results)); }

        return res.status(200).send(results.todos);
    });
}

// Create Todo
exports.post_todo_create = [
    body('title').trim(),
    body('date_of_created').toDate(),
    body('list').trim(),

    sanitizeBody('title').trim().escape(),
    sanitizeBody('date_of_created').toDate(),
    sanitizeBody('list').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var createNewTodo = new todosModel({
            title: req.body.title,
            date_of_created : req.body.date_of_created,
            list : req.body.list
        });

        if(!errors.isEmpty()) {
            return next(res.send(errors.array()));
        } else {
            
        }
    }

];

exports.get_todo_create = function(req, res, next) {

}

// Delete Todo
exports.get_todo_delete = function(req, res, next) {

}

exports.post_todo_delete = function(req, res, next) {

}

// Update Todo
exports.post_todo_modify = function(req, res, next) {

}

exports.get_todo_modify = function(req, res, next) {

}

// Single Detail
exports.get_todos_detail = function(req, res, next) {
    let todoId = req.params.id;
    res.send('this GET API card detail for ID: '+ todoId);
}

