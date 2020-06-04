const mongoose = require('mongoose');
const Search = require('../models/db/searchModel');
const crudRepository = require('../database/crudRepository');

module.exports.findAll = async function() {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: Search,
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
        console.log('ERROR-searchService-findAll: ', error);
    }
    return responseObj;
}

module.exports.findById = async function(searchId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {_id: mongoose.Types.ObjectId(searchId)},
            model: Search,
            projection: { __v: false }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.status = true;
            responseObj.result = responseFromRepository.result;
        }
    } catch (error){
        console.log('ERROR-searchService-findOne: ', error);
    }
    return responseObj;
}

module.exports.delete = async function(searchId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(searchId)
            },
            model: Search,
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
        console.log('ERROR-searchService-delete: ', error);
    }
    return responseObj;
}

module.exports.update = async function(search) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(search.id)
            },
            model: Search,
            projection: {
                __v: false
            },
            updateQuery: {}
        };
        if (search.date_time) data.updateQuery.date_time = search.date_time;
        const responseFromDatabase = await crudRepository.updateData(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-searchService-update: ', e);
    }
    return responseObj;
}

module.exports.dates = async function(date1, date2){
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {"date_time":{ $gte:new Date(date1), $lt:new Date(date2)}},
            model: Search,
            projection: { __v: false }
        };
        const responseFromRepository = await crudRepository.find(data);
        if (responseFromRepository.status) {
            responseObj.status = true;
            responseObj.result = responseFromRepository.result;
        }
    } catch (error){
        console.log('ERROR-searchService-dates: ', error);
    }
    return responseObj;
}

module.exports.create = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const search = new Search(dataFromController);
        const responseFromDatabase = await crudRepository.saveData(search);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-searchService-create: ', error);
    }
    return responseObj;
}
