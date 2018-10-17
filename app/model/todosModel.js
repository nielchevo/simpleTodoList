var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todosSchema = new Schema ({
    title           : {type: String },
    date_of_created : {type: Date, default: Date.now},
    list            : [{
        content: { type: String },
        done: {type: Boolean, default: false}
    }],
    user            : {type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic        : {type: Boolean, default : false}
});

module.exports = mongoose.model('ToDo', todosSchema );