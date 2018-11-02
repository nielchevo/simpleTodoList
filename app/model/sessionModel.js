/*
This model to simulate Auth server which save refresh token to authentificate if user still authorized
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
    userId      : {type: Schema.Types.ObjectId, ref: 'User', require: true},
    tokenHash   : {type: String, require: true},
    isRevoked   : {type: Boolean, default: false},
})

module.exports = mongoose.model('tokenSession', sessionSchema);