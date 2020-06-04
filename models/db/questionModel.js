const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    category : String,
    difficulty : String,
    type : String,
    question : String,
    correct_answer : String,
    incorrect_answers: Array,
    id_date: String
},
{
    versionKey: false
});

module.exports = mongoose.model('Question',questionSchema);