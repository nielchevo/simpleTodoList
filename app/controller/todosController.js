var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const mongoose = require('mongoose');

var todosModel = require('../model/todosModel');
var userModel = require('../model/userModel');

// --------------  API GET All ToDos --------------  
// reference: 
// https://stackoverflow.com/questions/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-console
// https://stackoverflow.com/questions/40756072/mongoose-find-by-objectid
exports.get_todos_lists = function (req, res, next) {
    async.parallel({
        // Async Tasks
        Todos: function (callback) {
            todosModel.find({ 'userId': req.decodedUserId })
                .exec(callback);
        }
    }, function (err, results) {
        // Async Callback
        if (err) { return res.send(500).send(results); }

        // Success.HTTP 200 & todo results
        return res.status(200).send(results.Todos);
    });
}

// --------------  API Create ToDo --------------  
exports.post_todo_create = [

    body('title').trim(),
    body('list').trim(),

    sanitizeBody('*').trim().escape(),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('list').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let createTodo = new todosModel({
            title: req.body.title,
            list: req.body.list,
            userId: req.decodedUserId,
        });

        if (!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else {

            createTodo.save(function (err, success) {
                if (err) {
                    console.error('DB Save error !!', err);
                    return res.status(400).send(err);
                }

                res.status(201).send(success);
            });
        }
    }
];

exports.post_todo_delete = function (req, res, next) {
    try{
        todosModel.findOneAndDelete({ _id: req.params.id, userId: req.decodedUserId }, 
            { /* Options */ },
            function(err, results) {
                if(err) { 
                    return res.sendStatus(404).send(err);
                }
    
                if(results === null){
                    return res.status(500).send('No such ID exist !');
                }
    
                res.status(200).send("Todo with title ("+ results.title +") and _ID ("+ results._id +") successfully deleted !");
        });
    }
    catch(error) {
        console.log(error);
    }
}

// --------------  API Update ToDo --------------  
// reference: https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34
exports.post_todo_modify = [

    body('list').trim(),

    sanitizeBody('*').trim().escape(),
    sanitizeBody('list').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        console.log('post edit modify');
        if (!errors.isEmpty()) {
            // Validation Error
            console.error('Validation Input Error !!', errors.array());
            return res.status(422).send(errors.array());
        }
        else {
            let id = req.params.id;
            if (mongoose.Types.ObjectId.isValid(id)) {
                todosModel.findByIdAndUpdate(id,
                    {
                        "$set": {
                            list: req.body.list
                        }
                    }).then(function (todo) {
                        if (todo) {
                            return res.status(204).send(todo);
                        } else {
                            return res.status(404).send({ error: "todo with that id didn't exists" });
                        }
                    }).catch(function (err) {
                        if (err) { return next(err); }
                    });
            } else {
                return res.status(500).send({ error: "incorrect id" });
            }
        }
    }
];

// reference for update sub array in mongo
// https://stackoverflow.com/questions/12612581/update-an-element-in-sub-of-sub-array-in-mongodb
exports.testupdate = function (req, res, next) {
    let idcard = req.body.idcard;
    let idlist = req.body.idlist;
    let isDone = req.body.isDone;

    console.log('idcard:', idcard);
    console.log('idlist:', idlist);
    console.log('isDone:', isDone);

    let criteria = {
        '_id' : idcard,
        'list._id': idlist
    };

    let update = {
        "$set": {
            'list.$.isDone': isDone
        }
    };

    let option = { upsert: false };

    todosModel.findOneAndUpdate(criteria, update, option, 
        function (err, result) {
            if (err) {
                console.log('test errorrrrr');
            }

            if (result) {
                console.log('should be success!');
            }
        }
    );
}

exports.post_todo_delete_item = function(req, res, next) {

    // let Object for ease to read
    let query = {_id: req.params.id, userId: req.decodedUserId} 

    // Array Update operator '$pull' reference https://docs.mongodb.com/manual/reference/operator/update/pull/index.html
    let update = { 
                    $pull:{ "list":{ "_id": req.body.itemID } }
                 }

    // MongoDB's 'upsert' reference https://docs.mongodb.com/manual/reference/method/db.collection.update/
    let option = {upsert: false}
    
    todosModel.findOneAndUpdate( query, update, option,
        function(err, result) {
            // callback
            if(err) { return res.status(500).send(error); }
            
            
            if(result !== null) {
                // object db exist, response with deleted itemID. 
                return res.status(200).send({data: result, message: "Success delete item" });
            }
            
            // Any Error return 504 service unavailable. 
            return res.status(504).send({error: "Data not found"})
        }
    )
}

exports.post_todo_done_item = function (req, res, next) {

    // let Object for ease to read
    let query = { _id: req.params.id, userId: req.decodedUserId }
    let isDone = req.body.isDone;

    // Array Update operator '$pull' reference https://docs.mongodb.com/manual/reference/operator/update/pull/index.html
    let update = {
        $pull: { "list": { "_id": req.body.itemID } }
    };

    // MongoDB's 'upsert' reference https://docs.mongodb.com/manual/reference/method/db.collection.update/
    let option = { upsert: false };

    todosModel.findOneAndUpdate(query, update, option,
        function (err, result) {
            // callback
            if (err) { return res.status(500).send(error); }


            if (result !== null) {
                // object db exist, response with deleted itemID.
                return res.sendStatus(200);
            }

            // Any Error return 504 service unavailable.
            return res.status(504).send({ error: "Data not found" });
        }
    );
};

// route for set a todo public or no
// only require isPublic:true/false in request body
// ref: https://stackoverflow.com/questions/37267042/mongoose-findoneandupdate-updating-multiple-fields
exports.post_todo_setpublic = function (req, res, next) {
    todosModel.findOne({ _id: req.params.id, userId: req.decodedUserId })
        .then(function (todo) {
            if (todo) {
                todosModel.findOneAndUpdate({ "_id": req.params.id },
                    {
                        "$set": {
                            "isPublic": req.body.isPublic
                        }
                    }, {}, function (err, thetodo) {
                        if (err) { return next(err); }
                        res.status(200).send(thetodo);
                    });
            }
        }).catch(function (err) {
            if (err) { return next(err); }
        });

    //res.sendStatus(200);
}

// --------------  API GET Single Detail ToDo --------------  
exports.get_todos_detail = function (req, res, next) {
    let todoId = req.params.id;

    todosModel.findOne({ _id: todoId, userId: req.decodedUserId}, function(err, results) {
        // TODO: Need proper error handling
        if(err) { return next(err); }
        
        res.status(200).send(results);
    });
}