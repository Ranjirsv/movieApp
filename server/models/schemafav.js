/*schema file for favorite films details */
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/mydatabase');
var Schema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    poster: {
        type: String,
        unique: true
    },
    release_date: {
        type: String,
        unique: true
    },
    username:String,

});


var MyModel = mongoose.model('favourite', Schema);
module.exports = MyModel;