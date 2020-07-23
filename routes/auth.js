const express = require('express'); 
const router = express.Router();  //router
const User = require('../models/user'); //user model
const passport = require('passport');
const localStrategy = require('passport-local');

//AUTH ROUTES

//sign-up Route
//show signup form
router.get('/register', function (req, res) {
    res.render('user-authentication/register');
})
//handle sign-up data
router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', "Error! "+err.message);
            return res.redirect('/register');
        }        
        passport.authenticate('local')(req, res, function () {
            req.flash('success',"Successfully Signed-Up!");
            res.redirect('/campgrounds');
        })
       // res.redirect('/login');
    } )
});

//Login Route
//show login form
router.get('/login', function (req, res) {
    res.render('user-authentication/login');
});

//handle user login
router.post('/login', passport.authenticate('local', {
    successFlash: "Successfully Logged-In!",
    successRedirect: '/campgrounds', 
    failureFlash: "Error! Wrong Username or Password",
    failureRedirect: '/login'
    }) ,function (req, res) {
})

//Logout Route
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success',"Successfully Logged-Out");
    res.redirect('/');
})

module.exports = router;