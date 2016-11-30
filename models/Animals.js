var mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
    name: {type : String, default: ""},
    audio: {type : String, default: ""},
    image: {type : String, default: ""}
});

mongoose.model('Animal', AnimalSchema);