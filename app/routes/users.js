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

// GET to get list of todo by username
router.get('/user/:username/todo', VerifyToken, userController.get_todo_by_username);

// POST update user
router.post('/user/:userId/update', VerifyToken, userController.post_update_user);

module.exports = router;
