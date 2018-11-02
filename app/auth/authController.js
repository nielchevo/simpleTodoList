const jwt = require('jsonwebtoken');
const configs = require('../config/configs');
const SessionModel = require('../model/sessionModel');

// namespaces
const Mongoose = require('mongoose').Types.ObjectId; //mongoose.Types.Objectid namespace

exports.validateToken = function validateToken(req, res, next) {

}

function saveTokenToDB (User, Token, callback) {
    
    let saveToken = new SessionModel({
            userId: User.userId,
            tokenHash: Token 
        });

    saveToken.save(function(err, results) { 
        if(err) {
            console.log('error when saved refresh to db');
        }
        console.log('refresh token is saved to DB !');
    });
}

exports.GenerateRefreshToken = function(user) {
    // Generate Refresh token 
    
    var refreshToken = jwt.sign({ 
        refreshPayload: { _id: user.userId, username: user.username}
        }, 
        configs.RefreshSecret,
        { expiresIn: configs.RefreshLifetime }
    );
    
    saveTokenToDB(user, refreshToken);
    
    return refreshToken;
};

module.exports.refresh = function(token, refreshOption) {
    //jwt.verify

    //delete all payload
    
    //renew with jwt.sign

};

module.exports.authVerify = function(req, res, next) {
    //dummy auth
}