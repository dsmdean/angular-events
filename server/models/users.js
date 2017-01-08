// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//create a users Schema
var User = new Schema({
    username: String,
    password: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: String,
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
User.plugin(passportLocalMongoose);

// export model
module.exports = mongoose.model('User', User);