//REQUIRE 
require('dotenv').config();
const express = require("express");  
const app = express(); 
const bodyParser = require("body-parser");  
const mongoose = require("mongoose");  
const methodOverride = require('method-override');
const flash = require('connect-flash');
//authentication 
const passport = require('passport');
const localStrategy = require('passport-local');
//models
const User = require('./models/user');
const Campground = require('./models/campgrounds');   
const Comment = require('./models/comments');     
// const seedDB = require('./seeds'); 
//routes
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
//moment
app.locals.moment = require('moment');

//Mongo-DB Connection 
var URL = "mongodb://localhost:27017/yelpcampdb" || process.env.MONGO_URL; 

mongoose.connect(URL, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB!");
    //console.log(URL);
}).catch(err => {
    console.log(err);
});

//APP CONFIG
app.set("view engine", "ejs");   //set all pages in views dir as .ejs pages
app.use(bodyParser.urlencoded({ extended: true })); //body-parser
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Any text to encode password",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

//ROUTES
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use(authRoutes); //or app.use('/', authRoutes);

//ROOT ROUTE
app.get("/", function (req, res) {
    res.render("landing"); //rendering landing.ejs page
});

//LISTEN REQUEST AT PORT & LOCALHOST
var PORT = process.env.PORT || 3000; 
app.listen(PORT, function () { //assigning port no=3000, you can go for other port no too like:8080,8000, etc
    console.log("YelpCamp Server has been Started..!!");
})