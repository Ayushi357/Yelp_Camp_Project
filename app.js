var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
  {
    name: 'Salmon Creek',
    image:
        'https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Yosemite Westlake',
    image:
        'https://images.unsplash.com/photo-1533243367503-0b7337004671?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Black Mountain',
    image:
        'https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
        'https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Yosemite Westlake',
    image:
        'https://images.unsplash.com/photo-1533243367503-0b7337004671?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Black Mountain',
    image:
        'https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80'
  }
];

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(3000, function() {
  console.log('THE YELP CAMP SERVER HAS STARTED!');
});