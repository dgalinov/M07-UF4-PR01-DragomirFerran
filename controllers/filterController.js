const constants = require('../config/constants');
const axios = require('axios')

module.exports.category = async function(req,res) {
    try {
        const category = req.body.category;
        const {data:response} = await axios.get("https://opentdb.com/api_category.php");
        const categories = response.trivia_categories;
        function getCategory(cat){
            return cat.name === category;
        }
        const {data:responseID} = await axios.get("https://opentdb.com/api.php?amount=50&category="+categories.find(getCategory).id);

        res.send(responseID.results);

    }catch(e){
        console.log('ERROR-userController-authenticate: ', e);
    }
}

module.exports.type = async function(req,res) {
    try {
        const type = req.body.type;
        const {data:responseID} = await axios.get("https://opentdb.com/api.php?amount=50&type="+type);
        res.send(responseID.results);
    }catch(e){
        console.log('ERROR-userController-authenticate: ', e);
    }
}

module.exports.difficulty = async function(req,res) {
    try {
        const difficulty = req.body.difficulty;
        const {data:responseID} = await axios.get("https://opentdb.com/api.php?amount=50&difficulty="+difficulty);
        res.send(responseID.results);
    }catch(e){
        console.log('ERROR-userController-authenticate: ', e);
    }
}