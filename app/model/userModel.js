const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema( {
        username: {type: String, required: true, max: 50},
        password: {type: String, required: true, min: 6},
        token: {type: Schema.Types.ObjectId, ref: 'Session'}
    },
    { timestamps: true }
);

UserSchema.methods.getHashSync = function(parampassword) {
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