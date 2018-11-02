const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const configs = require('../config/configs');
var User = require('../model/userModel');
var Todo = require('../model/todosModel');
var SessionModel = require('../model/sessionModel');

exports.createUser = [
    
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
            User.findOne({ 'username': req.body.username })
                .then(function (user) {
                    if (user) {
                        return res.status(403).send({error:"username exist, use another"});
                    } else {
                        newUser.password = newUser.getHashSync(req.body.password);

                        newUser.save(function (err) {
                            if (err) {
                                return next(err);
                            };

                            var token = jwt.sign({
                                user: {
                                    _id: newUser._id,
                                    username: newUser.username
                                }
                            }, configs.AccessSecret, {
                                    expiresIn: "8h"
                                });

                            res.status(201).send({ auth: true, token: token });
                        });
                    }
                })
                .catch(function (error) {
                    if (error) {
                        return next(err);
                    }
                });
       }
    }
];

// POST handler for user login
exports.userLogin = [
    // validation & sanitize 
    body('username', 'Please fill out the username form !').isLength({min: 1}).trim(),
    body('password', 'please fill out the password form !').isLength({min: 1}).trim(),

    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            User.findOne({'username': req.body.username})
                .then(function(user) {
                    if(user && user.validPassword(req.body.password)){
                        // Generate Access token
                        var token = jwt.sign({
                                user: {
                                    _id: user._id,
                                    username: user.username
                                }
                            }, configs.AccessSecret, {
                                expiresIn: "30m"
                            });
                        
                        /* TODO: validate Refresh Token HERE (if expired, then renew) 
                        https://github.com/auth0/node-jsonwebtoken#refreshing-jwts */

                            // Generate Refresh token 
                        var refreshToken = jwt.sign({ user:{ _id: user._id, username: user.username } }, 
                                                    configs.RefreshSecret,
                                                    { expiresIn: configs.RefreshLifetime, jwtid: 'should_be_unique_JTI' }
                        );
                            
                        // TODO: Save refresh token to session DB
                        
                        let decodedRefresh = jwt.decode(refreshToken, {json:true} );
                        console.log(decodedRefresh);

                        res.status(200).send({auth: true, token: token, refreshToken: refreshToken});
                    }
                    else
                    {
                        res.status(401).send({message: 'invalid Authentification'});
                    }
                })
                .catch(function(err) {
                    if(err){ return next(err); }
                })
        }
        else
        {
            return next(errors.array());
        }
    }
];

// okay
exports.testProtected = function (req, res, next) {
    console.log('usercontroller testProtected: ', req.decodedUserId);
    res.sendStatus(200);
}

// GET route for getting todo list of a user
// reference: 
// https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
exports.get_todo_by_username = function (req, res, next) {
    User.findOne({ 'username': req.params.username })
        .then(function (user) {
            if (user) {
                //console.log(user._id);
                if (req.params.username === req.decodedUsername) {
                    // this when user requesting his/her own todos
                    Todo.find({ 'userId': user._id })
                        .then(function (todos) {
                            if (todos) {
                                return res.status(200).send(todos);
                            }
                        }).catch(function (err) {
                            //console.log('error when searching todos:', err);
                            if (err) { return next(err); }
                        });
                } else {
                    // this when user requesting other's todos                  
                    Todo.find({ 'userId': user.id, 'isPublic': true })
                        .then(function (todos) {
                            if (todos) {
                                return res.status(200).send(todos);
                            }
                        }).catch(function (err) {
                            if (err) { return next(err); }
                        });
                }
            } else {
                return res.status(404).send({error:"username not found"});
            }
        }).catch(function (err) {
            if (err) { return next(err); }
        });
}


// POST route for updating user
// currently limited only to password 
exports.post_update_user = [

    body('password', 'Password should not be empty !').isLength({ min: 1 }).trim(),
    body('password', 'Password minimum must be 6 characters !').isLength({ min: 6 }).trim(),
    body('passwordConf', 'Password Confirmation is required !').isLength({ min: 1 }).trim(),

    body('passwordConf').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation DO NOT match !');
        } else {
            return value;
        }
    }).trim(),

    sanitizeBody('*').trim().escape(), //global sanitize

    (req, res, next) => {
        const errors = validationResult(req);

        let updUser = new User();

        if (!errors.isEmpty()) {
            return res.status(422).send(errors.array());
        } else {
            if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
                hashedPassword = updUser.getHashSync(req.body.password);
                console.log(hashedPassword);

                User.findByIdAndUpdate(req.params.userId,
                    {
                        "$set": {
                            password: hashedPassword
                        }
                    }
                ).then(function (user) {
                    if (user) {
                        return res.status(204).send({ success: "user updated" });
                    } else {
                        return res.status(404).send({ error: "user not found" });
                    }
                }).catch(function (err) {
                    if (err) {
                        return next(err);
                    }
                });
            } else {
                return res.status(500).send({ error: "incorrect user id" });
            }
        }
    }
];