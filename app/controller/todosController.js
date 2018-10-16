var express = require('express');
var todosModel = require('../model/todosModel');

exports.get_todos_lists = function(req, res , next) {
    
    
    res.send('this GET API for all card lists');
}

exports.get_todos_detail = function(req, res, next) {
    let todoId = req.params.id;
    res.send('this GET API card detail for ID: '+ todoId);
}

