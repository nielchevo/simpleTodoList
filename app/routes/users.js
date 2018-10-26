var express = require('express');
var router = express.Router();
var VerifyToken = require('../auth/VerifyToken');

var userController = require('../controller/userController');

router.post('/user/create', userController.createUser);
router.get('/user/create', userController.get_createUser); //buat opo

router.post('/user/login', userController.userLogin);

router.post('/user/test1', VerifyToken, function(req, res, next) {
    console.log('test protected route!');
    console.log('req.decodedUserId:', req.decodedUserId);
    res.sendStatus(200);
});

router.post('/user/test2', VerifyToken, userController.testProtected);

module.exports = router;
