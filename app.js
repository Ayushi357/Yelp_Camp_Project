var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Campground.create(
//     {
//       name: 'Yosemite Westlake',
//       image:
//           'https://images.unsplash.com/photo-1533243367503-0b7337004671?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//       description:
//           'This is a huge Yosemite Westlake, no bathrooms. It\'s very
//           beautiful and serene.'
//     },
//     function(err, campground) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Newly Created Campground');
//         console.log(campground);
//       }
//     });

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, function() {
  console.log("THE YELP CAMP SERVER HAS STARTED!");
});
