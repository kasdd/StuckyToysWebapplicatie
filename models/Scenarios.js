var mongoose = require('mongoose');

var ScenarioSchema = new mongoose.Schema({
    audio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
});

mongoose.model('Scenario', ScenarioSchema);