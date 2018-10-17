var express = require('express');
var router = express.Router();

var todosController = require('../controller/todosController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET list todos
router.get('/todos', todosController.get_todos_lists);


// POST create a todo
router.get('/todo/create', todosController.get_todo_create);
router.post('/todo/create', todosController.post_todo_create);

// POST todo delete
router.get('/todo/delete', todosController.get_todo_delete);
router.post('/todo/delete', todosController.post_todo_delete);

// POST update todo
router.get('/todo/:id/update', todosController.get_todo_modify);
router.post('/todo/:id/update', todosController.post_todo_modify);

// GET Single detail of a todo
router.get('/todo/:id', todosController.get_todos_detail);

module.exports = router;
