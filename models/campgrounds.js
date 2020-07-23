//IMPORTING 
const mongoose = require('mongoose');
//const commentSchema = require('./comments');

//SCHEMA SETUP
const camproundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    createdAt : {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
       // commentSchema
    ]
});

//COMPILING SCHEMA INTO MODEL
const Campground = mongoose.model("Campground", camproundSchema);

module.exports = Campground;