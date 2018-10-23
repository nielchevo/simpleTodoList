const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const jwt = require('jsonwebtoken');
const configs = require('../config/configs');
var User = require('../model/userModel');

exports.createUser = [
    
    // validation still not working properly here
    body('username', 'Username should not be empty !').isLength({min: 1}).trim(),
    body('password', 'Password should not be empty !').isLength({min: 1}).trim(),
    body('password', 'Password minimum must be 6 characters !').isLength({min: 6}).trim(),
    body('passwordConf', 'Password Confirmation is required !').isLength({min: 1}).trim(),
    
    body('passwordConf').custom((value, {req}) =>{ 
        if(value !== req.body.password) {
            throw new Error('Password confirmation DO NOT match !');
        }else{
            return value;
        }
    }).trim(),

    sanitizeBody('*').trim().escape(), //global sanitize
    
    (req, res, next) => {
        const errors = validationResult(req);
        
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        if (!errors.isEmpty()) {
            return res.status(422).send(errors.array());
            
        } else {
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

                res.status(201).send({ auth: true, token: token });
            });
       }
    }
];

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
