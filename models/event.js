var mongoose = require('mongoose');
var date = new Date;
// Schema Setup
var eventSchema = mongoose.Schema({
    title: String,
    to: String,
    body: String,
    from: String,
    time: Date,
    accept: Boolean,
    color: String,
    font: String,
    people: String,
    food: String,
    dtime: Date,
});

module.exports = mongoose.model("Event",eventSchema);

