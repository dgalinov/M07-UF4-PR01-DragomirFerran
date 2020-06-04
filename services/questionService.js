const mongoose = require('mongoose');
const Question = require('../models/db/questionModel');
const Search = require('../models/db/searchModel');
const crudRepository = require('../database/crudRepository');
const axios = require('axios');

module.exports.getQuestion = async function(token) {
    const responseObj = { status: false };
    try {
        const date = new Date();
        const search = new Search({"date_time": date});
        const save_search_response = await crudRepository.saveData(search);
        const id_date = save_search_response.result._id;
        const {data:response} = await axios.get("https://opentdb.com/api.php?amount=1");
        const obj = JSON.stringify(response.results).slice(1, -2);
        const obj_date = obj+',"id_date":"'+id_date+'"}';
        const obj_date_result = JSON.parse(obj_date);
        const question = new Question(obj_date_result);
        let responseFromDatabase = { status: false };
        if (token!="Not Logged"){
            responseFromDatabase = await crudRepository.saveData(question);
        }else{
            responseFromDatabase.status=true;
            responseFromDatabase.result=question;
        }

        if (responseFromDatabase.status && save_search_response.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result+save_search_response.result;
        }
    } catch (error){
        console.log('ERROR-questionService-getQuestion: ', error);
    }
    return responseObj;
}

module.exports.findAll = async function() {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: Question,
            projection: {
                __v: false
            }
        };
        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-findAll: ', error);
    }
    return responseObj;
}

module.exports.findById = async function(questionId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {_id: mongoose.Types.ObjectId(questionId)},
            model: Question,
            projection: { __v: false }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.status = true;
            responseObj.result = responseFromRepository.result;
        }
    } catch (error){
        console.log('ERROR-questionService-findOne: ', error);
    }
    return responseObj;
}

module.exports.delete = async function(questionId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(questionId)
            },
            model: Question,
            projection: {
                __v: false
            }
        };
        const responseFromDatabase = await crudRepository.deleteData(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-delete: ', error);
    }
    return responseObj;
}

module.exports.update = async function(question) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(question.id)
            },
            model: Question,
            projection: {
                __v: false
            },
            updateQuery: {}
        };
        if (question.date_time) data.updateQuery.date_time = question.date_time;
        const responseFromDatabase = await crudRepository.updateData(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-questionService-update: ', e);
    }
    return responseObj;
}

module.exports.create = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const question = new Question(dataFromController);
        const responseFromDatabase = await crudRepository.saveData(question);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-create: ', error);
    }
    return responseObj;
}
