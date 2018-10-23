var jwt = require('jsonwebtoken');
var configs = require('../config/configs');

function verifyToken(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    const reqtoken = tokenHeader.split(' ');
    const token = reqtoken[1];
    console.log('token ', token);

    jwt.verify(token, configs.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        console.log('verify token: ', decoded);
        req.userId = decoded._id;
        next();
    });
}

module.exports = verifyToken;