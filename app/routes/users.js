var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');

router.post('/user/create', userController.createUser);
router.get('/user/create', userController.get_createUser); //buat opo

module.exports = router;
