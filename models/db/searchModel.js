const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
    date_time: Date
},
{
    versionKey: false
});

module.exports = mongoose.model('Search',searchSchema);