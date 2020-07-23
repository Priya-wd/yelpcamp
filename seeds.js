const mongoose = require('mongoose');
const Campground = require('./models/campgrounds'); //importing campgrounds.js file
const Comment = require('./models/comments'); //importing comments.js file


//campgrounds Data Array
var campgroundsData = [
    {
        name: "Green Hill",
        image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/camping-1835352__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "Lake Park",
        image: "https://cdn.pixabay.com/photo/2016/12/08/17/45/lake-sara-1892494__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "River Front",
        image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "Mountain Peak",
        image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "River Front",
        image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "Snow Mountain",
        image: "https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    },
    {
        name: "Green Hill",
        image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/camping-1835352__340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, placeat. Consequatur et animi repellat architecto, cumque at ipsum omnis quaerat perferendis, nemo quas. Ullam adipisci maxime, unde vel non nemo."
    }
];

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Campgrounds Removed !!");
        Comment.remove({}, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Comments Removed !!");
            //         //Add New campgrounds
            //         campgroundsData.forEach(seed => {
            //             Campground.create(seed, function (err, campground) {
            //                 if (err) {
            //                     return console.error(err);
            //                 }
            //                 console.log("Campground Added !!");

            //                 // campground.comments.push(comment);
            //                 //     campground.save();
            //                 //     console.log("Comment added !");

            //                 //create comments
            //                 Comment.create({
            //                     text: "This is great place. I love it!!",
            //                     author: "Priya"
            //                 }, function (err, comment) {
            //                     if (err) {
            //                         return console.error(err);
            //                     }
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("Comment added !");
            //                 })
            //             })
            //         })
        })

    });

}

module.exports = seedDB;

