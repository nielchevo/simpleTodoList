const mongoose = require('mongoose');

//var mongoURL = 'pawz:simpletodolist1@ds151809.mlab.com:51809';
var mongoURL = 'localhost';
//var dbName   = 'simpletodolist';
var dbName   = 'simpleTodoList';
mongoose.connect('mongodb://'+ mongoURL +'/'+ dbName, {useNewUrlParser: true} );
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, "[DB ERROR] MongoDB Connection error !!"));
db.once('open', ()=>{
    console.log("[DB CONNECT] OK! ");
});

module.exports = db;