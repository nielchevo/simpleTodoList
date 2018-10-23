const mongoose = require('mongoose');

var mongoURL = 'localhost';
var dbName   = 'simpleTodoList';
mongoose.connect('mongodb://'+ mongoURL +'/'+ dbName, {useNewUrlParser: true} );
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, "[DB ERROR] MongoDB Connection error !!"));
db.once('open', ()=>{
    console.log("[DB CONNECT] OK! ");
});

module.exports = db;