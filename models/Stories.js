var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
    name: String,
    scenarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scenario'
    }]
});

mongoose.model('Story', StorySchema);