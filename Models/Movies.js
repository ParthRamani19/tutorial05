var mongoose = require('mongoose');

var meetSchema = mongoose.Schema({
    name:String,
    rating:Number
})

module.exports = mongoose.model("meet",meetSchema)
