var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');

var userController = require('../controller/userController');

router.post('/user/create', userController.createUser);

router.post('/user/login', userController.userLogin);

router.post('/user/test1', VerifyToken, function(req, res, next) {
    console.log('test protected route!');
    console.log('req.decodedUserId:', req.decodedUserId);
    res.sendStatus(200);
});

router.post('/user/test2', VerifyToken, userController.testProtected);

// POST to get list of todo by username
router.post('/user/:username/todo', VerifyToken, userController.post_todo_by_username);

module.exports = router;
