// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a location Schema
var locationSchema = new Schema({
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    }
});

//create a session Schema
var sessionSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    creatorName: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        min: 1,
        max: 4,
        default: 1
    },
    level: {
        type: String,
        default: 'Introductory'
    },
    abstract: {
        type: String,
        default: ''
    },
    upVoteCount: {
        type: Number,
        default: 0
    },
    votedUsers: [{
        type: String
    }]
}, {
    timestamps: true
});


//create a event Schema
var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: locationSchema
    },
    imageUrl: {
        type: String,
        required: true
    },
    sessions: [sessionSchema]
}, {
    timestamps: true
});

// create model
var Events = mongoose.model('Event', eventSchema);

// export model
module.exports = Events;