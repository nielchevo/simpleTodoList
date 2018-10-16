var mongoose = require('mongoose');

var todosSchema = new mongoose.Schema ({
    title           : {type: String },
    date_of_created : {type: Date, default: Date.now},
    list            : [{type : String}]
});

module.exports = mongoose.model('ToDo', todosSchema, 'card');