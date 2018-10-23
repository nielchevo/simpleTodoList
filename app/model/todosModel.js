var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todosSchema = new Schema ({
    title           : {type: String },
    date_of_created : {type: Date, default: Date.now},
    list            : [{
                        content: { type: String },
                        isDone:  { type: Boolean, default: false}
                      }],
    userId          : {type: Schema.ObjectId, ref: 'User', required: true },
    isPublic        : {type: Boolean, default : true}
});

module.exports = mongoose.model('ToDo', todosSchema);