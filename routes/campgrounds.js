const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');   //importing campgrounds.js model
const middleware = require('../middleware/custom-middleware');

//CAMPGROUND ROUTES
//Index Route
router.get("/", function (req, res) {
    //find all campgronds from DB
    Campground.find({}, function (err, campgroundsData) {
        if (err) {
            console.error("err");
        } else {
            res.render("campgrounds/index", { campgroundsData: campgroundsData });
        }
    });
});

//New Route  
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

//Create Route 
router.post("/", middleware.isLoggedIn, function (req, res) {
    //get data from form          
    req.body.campground.author = { id: req.user._id, username: req.user.username };
    let newCampground = req.body.campground;
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success',"Campground Added Successfully!");
            res.redirect("/campgrounds");
        }
    });

})

//Show Route
//this route should be placed at end otherwise it will relace routes like campgrounds/new
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {//built-in method to find record by using id
        if (err) {
            res.redirect('/campgrounds');
        } else {
            //pass found campground to show page
            // console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//Edit Route
router.get('/:id/edit', middleware.isCampgroundAuthor, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render('campgrounds/edit', { campground: foundCampground });
    })
});

//Update Route
router.put('/:id', middleware.isCampgroundAuthor, function (req, res) {
    let updatedCampground = req.body.campground;
    Campground.findByIdAndUpdate(req.params.id, updatedCampground, function (err) {
        if (err) {
            res.redirect('back');
        }
        req.flash('success',"campground Updated Successfully!");
        res.redirect('/campgrounds/' + req.params.id);
    });
})

//Delete Route
router.delete('/:id', middleware.isCampgroundAuthor, function (req, res) {
    // res.send("Deleted Soon..!!");   
    Campground.findByIdAndRemove(req.params.id, function (err) {
        req.flash('success',"Campground Deleted Successfully!");
        res.redirect('/campgrounds');
    });
})

//export
module.exports = router;