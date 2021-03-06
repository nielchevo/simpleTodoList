var jwt = require('jsonwebtoken');
var configs = require('../config/configs');

function verifyToken(req, res, next) {
    //console.log('VERIFY TOKEN CALLED');
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    const reqtoken = tokenHeader.split(' ');
    const token = reqtoken[1];
    //console.log('token ', token);

    jwt.verify(token, configs.AccessSecret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.decodedUserId = decoded.user._id;
        req.decodedUsername = decoded.user.username;
        next();
    });
}

module.exports = verifyToken;