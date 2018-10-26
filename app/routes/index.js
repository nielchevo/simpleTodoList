var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');

var todosController = require('../controller/todosController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET list todos
router.get('/todos', VerifyToken, todosController.get_todos_lists);

// POST to get list of todo by username
router.post('/todo/:username', VerifyToken, todosController.post_todo_by_username);

// POST create a todo
router.get('/todo/create', todosController.get_todo_create); // route buat opo
router.post('/todo/create', VerifyToken, todosController.post_todo_create);

// POST todo delete
router.get('/todo/delete', todosController.get_todo_delete); // route buat opo
router.post('/todo/delete', VerifyToken, todosController.post_todo_delete);

// POST update todo
router.get('/todo/:id/update', todosController.get_todo_modify); // route buat opo
router.post('/todo/:id/update', VerifyToken, todosController.post_todo_modify);

// GET Single detail of a todo
router.get('/todo/:id', todosController.get_todos_detail);

// test route auth with GET
router.get('/todo/test/get', VerifyToken, todosController.test_get_auth);

module.exports = router;
