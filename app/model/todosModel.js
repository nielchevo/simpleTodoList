var mongoose = require('mongoose');

var todosSchema = new mongoose.Schema ({
    title           : {type: String },
    date_of_created : {type: Date, default: Date.now},
    list            : [{
        content: { type: String },
        done: Boolean
    }],
    user            : {type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('ToDo', todosSchema, 'card');