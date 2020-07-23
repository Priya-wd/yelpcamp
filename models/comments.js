//import
const mongoose = require('mongoose');

//schema
const commentSchema = new mongoose.Schema({
        text: String,
        createdAt : {type: Date, default: Date.now},
        author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            username: String
        }
    })

//model
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

//module.exports = commentSchema;