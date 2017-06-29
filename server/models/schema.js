/*schema file for signup details*/
var mongoose = require('mongoose');


var Schema = mongoose.Schema({
    username: String,

    phonenumber: {
        type: Number,
        unique: true
    },
    mail: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
});


var MyModel = mongoose.model('user', Schema);
module.exports = MyModel;