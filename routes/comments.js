const express = require('express'),
       router = express.Router({mergeParams: true});       
const Campground = require('../models/campgrounds'), //campground model
         Comment = require('../models/comments'); //comment model
const middleware = require('../middleware/custom-middleware');

//COMMENTS ROUTES
//New-Comment Route
router.get('/new', middleware.isLoggedIn, function (req, res) {   
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            return console.log(err);
        }
        res.render('comments/new', {campground : campground}); //comments/new.ejs
    })    
})

//Create-Comment Route
router.post('/', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            return console.log(err);
        }
        Comment.create(req.body.comment, function(err, comment){
            if (err) {
                return res.redirect('back');
            }
            comment.author.username = req.user.username;
            comment.author.id = req.user._id;
            comment.save();            
            campground.comments.push(comment);
            campground.save();
            req.flash('success',"Comment Added Successfully!");
            res.redirect('/campgrounds/'+ campground._id);
        })
    }) 
})

//Edit-Comment Route
router.get('/:comment_id/edit', middleware.isCommentAuthor, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        res.render('comments/edit', {comment: foundComment, campground_id : req.params.id});
    })   
});

//Update-Comment Route
router.put('/:comment_id', middleware.isCommentAuthor, function (req, res) {
   // res.send("Update");
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
       if (err) {
           return res.redirect('back');
       }
       req.flash('success',"Comment Updated Successfully!");
       res.redirect('/campgrounds/'+ req.params.id);
   })
});

//Delete-Comment Route
router.delete('/:comment_id', middleware.isCommentAuthor, function (req, res) {
   // res.send("Delete");
   Comment.findByIdAndRemove(req.params.comment_id, function (err) {
       if (err) {
           return res.redirect('back');
       }
       //res.redirect('/campgrounds/'+ req.params.id);
       req.flash('success',"Comment Deleted Successfully!");
       res.redirect('back');
   })
});

//Export
module.exports = router;