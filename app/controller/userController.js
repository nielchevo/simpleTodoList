var User = require('../model/userModel');

exports.createUser = function (req, res, next) {
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

exports.userLogin = function (req, res, next) {
    //login banyak yg harus di lakuin
}
