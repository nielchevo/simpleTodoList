var User = require('../model/userModel');

exports.createUser = function (req, res, next) {
    console.log('call from user/create');

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
};

exports.get_createUser = function(req, res, next) {
    console.log('test oyy');

    User.find().exec(function(err, dbSuccess) {
    if(err) { return next(res.status(422).send(err)); }

    res.status(201).send(dbSuccess);
   });
}

exports.userLogin = function (req, res, next) {
    //login banyak yg harus di lakuin
}
