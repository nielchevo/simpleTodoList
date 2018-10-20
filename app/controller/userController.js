const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var User = require('../model/userModel');

exports.createUser = function (req, res, next) {
    check('username', 'Username is required').notEmpty();
    check('password', 'Password is required').notEmpty();
    check('password', 'Password character minimum must be 6').isLength({ min: 5 });
    check('passwordConf', 'Password Confirmation is required').notEmpty();
    check('passowrdConf', 'Password Confirmation do not match').equals(req.body.password);

    sanitizeBody('username').trim().escape();
    sanitizeBody('password').trim().escape();

    const errors = validationResult(req);
    if (errors) {
        res.status(400).json({message: errors});
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
    
        newUser.password = newUser.getHash(req.body.password);
    
        newUser.save(function (err) {
            if (err) {
                return next(err)
            };
            res.json({ user: newUser });
        });
    }    
};

exports.get_createUser = function(req, res, next) { // buat opo
    console.log('test oyy');

    User.find().exec(function(err, dbSuccess) {
    if(err) { return next(res.status(422).send(err)); }

    res.status(201).send(dbSuccess);
   });
}

exports.userLogin = function (req, res, next) {
    //login banyak yg harus di lakuin
}
