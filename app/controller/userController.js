const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const jwt = require('jsonwebtoken');
const configs = require('../config/configs');
var User = require('../model/userModel');

exports.createUser = function (req, res, next) {
    // validation still not working properly here
    // check('username', 'Username is required').not().isEmpty();
    // check('password', 'Password is required').not().isEmpty();
    // check('password', 'Password character minimum must be 6').isLength({ min: 6 });
    // check('passwordConf', 'Password Confirmation is required').not().isEmpty();
    // check('passwordConf', 'Password Confirmation do not match').equals(req.body.password);

    // sanitizeBody('username').trim().escape();
    // sanitizeBody('password').trim().escape();

    //const errors = validationResult(req);
    // if (errors) {
    //     console.log(errors);
    //     res.status(400).json({errors: errors});
        
    // } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
    
        newUser.password = newUser.getHashSync(req.body.password);
    
        newUser.save(function (err) {
            if (err) {
                //return res.status(500).send("Error registering user");
                return next(err)
            };
            var token = jwt.sign({ 
                user: {
                    _id: newUser._id,
                    username: newUser.username
            }}, configs.secret, {
                expiresIn: "8h"
            });

            // res.status(200).send({
            //     user: {
            //         _id: newUser._id,
            //         username: newUser.username
            //     }
            // });
            res.status(200).send({ auth: true, token: token });
        });
    //}    
};

exports.get_createUser = function(req, res, next) { // buat opo
    console.log('test oyy');

    User.find().exec(function(err, dbSuccess) {
    if(err) { return next(res.status(422).send(err)); }

    res.status(201).send(dbSuccess);
   });
}

// POST handler for user login
exports.userLogin = function (req, res, next) {
    // validation
    // ... 
    // end of validation
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    var token = jwt.sign({
        user: {
            _id: newUser._id,
            username: newUser.username
        }
    }, configs.secret, {
        expiresIn: "8h"
    });
    res.status(200).send({ auth: true, token: token });
}

// okay
exports.testProtected = function (req, res, next) {
    console.log('usercontroller testProtected: ', req.userId);
    res.sendStatus(200);
}
