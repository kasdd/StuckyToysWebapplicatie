var mongoose = require('mongoose');

var ScenarioSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    audio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio'
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
});

mongoose.model('Scenario', ScenarioSchema);