var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var express = require('express');

cloudinary.config({
  cloud_name: 'douskchks',
  api_key: '552883666323728',
  api_secret: 'RhDl-TvAXIiaPkeBWOHY8OcCwr8'
});

var router = express.Router();

var Animal = mongoose.model('Animal');
var Story = mongoose.model('Story');
var Scenario = mongoose.model('Scenario');
var Theme = mongoose.model('Theme');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Upload Images and Audio files
router.post('/upload/image', function(req, res, next) {
    cloudinary.v2.uploader.upload(req.body.data, {resource_type: "image"}, function(error, result){
      if(error){ return console.log(error);}
      res.send(result.url);
  });
});

router.post('/upload/audio', function(req, res, next){
  cloudinary.v2.uploader.upload(req.body.data, { resource_type: "video", chunk_size: 6000000} ,function(error, result){
      if(error){ return console.log(error);}
      res.send(result.url);
  });
});

//Animal routes
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

router.delete('/animals/:animal', function(req, res, next){
  cloudinary.v2.uploader.destroy(req.animal.audio, function(error, result) {
    if(error){return console.log('audio niet verwijderd');}
    cloudinary.v2.uploader.destroy(req.animal.image, function(error, result) {
      if(error){return console.log('image niet verwijderd');}
        req.animal.remove(function(err,animal){
          if(err){return next(err);}
        });  
     });
   });  
});

router.param('animal', function(req, res, next, id){
  var query = Animal.findById(id);
  query.exec(function(err, animal){
        if (err) { return next(err); }
        if (!animal) { return next(new Error("can't find animal")); }
        req.animal = animal;
        return next();
  })
});

//Story routes
router.param('story', function(req, res, next, id){
  var query = Story.findById(id);
  query.exec(function(err, story){
        if (err) { return next(err); }
        if (!story) { return next(new Error("can't find story")); }
        req.story = story;
        return next();
  })
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

router.get('/stories/:story', function(req, res, next) {
        res.json(req.story);
});

router.put('/stories/:story', function(req,res,next){
  Story.findById(req.story._id, function(err, story){
    console.log(story);
    console.log('Scenario aanmaken');
        var scenario = new Scenario(req.body);
        scenario.save(function(err,scenario){
          if(err){res.send(err);}
        });
        console.log(scenario);
        story.scenarios = story.scenarios || [];
        console.log(story.scenarios);
        story.scenarios.push(scenario); 
        story.save(function(err,story) {
          if (err) {
            res.send(err);
          }
            res.json(story);
          }
        );
      });
});



//Scenario routes
router.param('scenario', function(req, res, next, id){
  var query = Scenario.findById(id);
  query.exec(function(err, scenario){
        if (err) { return next(err); }
        if (!scenario) { return next(new Error("can't find scenario")); }
        req.scenario = scenario;
        return next();
  })
});

router.delete('/stories/:story/scenarios/:scenario', function(req, res, next){  //Bewerken
  cloudinary.v2.uploader.destroy(req.animal.audio, function(error, result) {
    if(error){return console.log('audio niet verwijderd');}
    cloudinary.v2.uploader.destroy(req.animal.image, function(error, result) {
      if(error){return console.log('image niet verwijderd');}
        req.story.scenarios.remove(function(err,animal){
          if(err){return next(err);}
        });  
     });
   });  
});

router.get('/scenarios/:scenario', function(req, res, next) {
        console.log(req);
        res.json(req.scenario);
});

//Theme routes
router.param('theme', function(req, res, next, id){
  var query = Theme.findById(id);
  query.exec(function(err, theme){
        if (err) { return next(err); }
        if (!theme) { return next(new Error("can't find theme")); }
        req.theme = theme;
        return next();
  })
});

router.get('/themes', function(req, res, next){
  Theme.find(function(err, themes){
    if(err){return next(err);}

    res.json(themes);
  });
});

router.post('/themes', function(req, res, next){
  var theme = new Theme(req.body);

  theme.save(function(err, theme){
    if(err){return next(err);}

    res.json(theme)
  });
});

router.delete('/themes/:theme', function(req, res, next){
  console.log(req.theme);
  req.theme.remove(function(err, theme){
    if(err)return next(err);
  });
});

module.exports = router;
