var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Animal = mongoose.model('Animal');
var Story = mongoose.model('Story');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/animals', function(req, res, next){
  Animal.find(function(err, animals){
    if(err){
      return next(err);
    }
    res.json(animals);
  });
});

router.post('/animals', function(req, res, next){
  var animal = new Animal(req.body);

  animal.save(function(err,animal){
    if(err){return next(err);}
    
    res.json(animal);
  });
});

router.get('/stories', function(req, res, next){
  Story.find(function(err, stories){
    if(err){return next(err);}

    res.json(stories);
  });
});

router.post('/stories', function(req, res, next){
  var story = new Story(req.body);

  story.save(function(err, story){
    if(err){return next(err);}

    res.json(story)
  });
});

module.exports = router;
