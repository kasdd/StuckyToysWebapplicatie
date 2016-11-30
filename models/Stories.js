var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
    name: String,
    thema: String,
    scenarios: {}
});

mongoose.model('Story', StorySchema);