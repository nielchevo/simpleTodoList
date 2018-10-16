var express = require('express');
var router = express.Router();

var todosController = require('../controller/todosController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todos', todosController.get_todos_lists);
router.get('/todo/id:', todosController.get_todos_detail);


module.exports = router;
