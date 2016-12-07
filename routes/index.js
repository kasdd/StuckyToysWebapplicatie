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
      if(error){ return console.log('foutmelding');}
      res.end(result.url);
  });
});

router.post('/upload/audio', function(req, res, next){
  cloudinary.v2.uploader.upload(req.body.data, { resource_type: "video", chunk_size: 6000000} ,function(error, result){
      if(error){ return console.log('foutmelding');}
      res.end(result.url);
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

//Theme routes
/*router.get('/themes', function(req, res, next){
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

//Afbeeldingen opslaan
router.post('/uploads/image',  function(req, res, next) {
  console.log("Kas");
  console.log(req);
  console.log(req.file);
  res.json({succes:true});
  });
  
  /*var photo = new Photo(req.body);
  photo.save(function(err, photo){
    if(err){return next("foutmelding");}

    res.json(photo);
  });
  uploadPhoto(req, res, function(err){
    if(err){
      console.log("foutmelding upload"); 
      return; 
    }
  });*/

module.exports = router;
