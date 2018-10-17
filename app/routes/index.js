var express = require('express');
var router = express.Router();

var todosController = require('../controller/todosController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET list todos
router.get('/todos', todosController.get_todos_lists);

// GET detail of a todo
router.get('/todo/:id', todosController.get_todos_detail);

// POST create a todo
router.post('/todo/create', todosController.post_todo_create);

// POST update todo
router.post('/todo/:id/update', todosController.post_todo_modify);

// POST todo delete
router.post('/todo/:id/delete', todosController.post_todo_delete);


module.exports = router;
