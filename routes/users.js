var express = require('express');
var router = express.Router();
var multer  = require('multer');  
var upload = multer({ dest: 'public/uploads/' });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
