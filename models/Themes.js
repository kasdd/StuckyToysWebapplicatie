var mongoose = require('mongoose');

var ThemeSchema = new mongoose.Schema({
    name: String,
    stories: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'}]
})

mongoose.model('Theme', ThemeSchema);