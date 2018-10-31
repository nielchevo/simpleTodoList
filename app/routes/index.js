var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');

var todosController = require('../controller/todosController');

/*
ROUTING GUIDE:
PLACE THE STATIC ROUTES AT TOP OF THE DYNAMIC ROUTES
*/

// GET list todos
router.get('/todos', VerifyToken, todosController.get_todos_lists);

// POST create a todo
router.post('/todo/create', VerifyToken, todosController.post_todo_create);

// POST todo delete
router.delete('/todo/delete', VerifyToken, todosController.post_todo_delete);

// test route auth with GET
router.get('/todo/test/get', VerifyToken, todosController.test_get_auth);

// POST update todo
router.post('/todo/:id/update', VerifyToken, todosController.post_todo_modify);

router.post('/todo/:id/setpublic', VerifyToken, todosController.post_todo_setpublic);

// GET Single detail of a todo
router.get('/todo/:id', VerifyToken, todosController.get_todos_detail);

module.exports = router;
