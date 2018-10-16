const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true}
}, {timestamps: true});

UserSchema.methods.getHash = function(parampassword) {
    let salt = bcryptjs.genSaltSync(SALT_WORK_FACTOR);
    let password = bcryptjs.hashSync(parampassword, salt);
    if (password !== 'undefined') {
        return password;
    } else {
        return res.sendStatus(500);
    }
};

UserSchema.methods.validPassword = function (parampassword) {
    return bcryptjs.compareSync(parampassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);