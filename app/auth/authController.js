const jwt = require('jsonwebtoken');
const authConfig = require('../config/configs');

exports.GenerateNewToken = function(userId, callback) {
    // jwt sign here
};

module.exports.refresh = function(token, refreshOption) {
    //jwt.verify

    //delete all payload
    
    //renew with jwt.sign

};

module.exports.authVerify = function(req, res, next) {
    //dummy auth
}