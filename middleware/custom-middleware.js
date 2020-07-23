//Import
const Campground = require('../models/campgrounds');
const Comment = require('../models/comments'); 

//Main Middleware Object
var middlewareObj = {};

//middleware function to check authentication
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error',"Please Log-In to Continue");
    res.redirect('/login');
}

//middleware function to check authorization
middlewareObj.isCampgroundAuthor = function (req, res, next) {
    //check login
    if (req.isAuthenticated()) {
        //find campground
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                return res.redirect('back');
            } 
             //check authorization                 
             if (foundCampground.author.id.equals(req.user._id)) {
                //if author
                next();
            } else {
                //no author
                req.flash('error',"You Cannot Do That");
                res.redirect('back');
            }
        })
    } else {
        res.redirect('/login');
    }
}

//middleware function to check authorization
middlewareObj.isCommentAuthor = function (req, res, next) {
    //check login
    if (req.isAuthenticated()) {
        //find campground
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                return res.redirect('back');
            } 
             //check authorization                 
             if (foundComment.author.id.equals(req.user._id)) {
                //if author
                next();
            } else {
                //no author
                req.flash('error',"You Cannot Do That");
                res.redirect('back');
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = middlewareObj;