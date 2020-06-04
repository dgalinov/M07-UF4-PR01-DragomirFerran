const axios = require('axios');
const constants = require('../config/constants');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');

module.exports.getUserList = async function(page) {
    const responseObj = constants.responseObj;
    try {
        const respostaJSON = await axios.get('https://reqres.in/api/users?page='+page);
        if (respostaJSON.status === constants.httpStatus.ok) {
            responseObj.status = respostaJSON.status;
            responseObj.body = respostaJSON.data;
        }
    } catch (e){
        console.log('ERROR-userService-getUserList: ', e);
    }
    return responseObj;
}

module.exports.create = async function(user) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            model: new User(user)
        }
        const responseFromDatabase = await crudRepository.insertData(data);
        if (responseFromDatabase.status) {
            responseObj.status = constants.httpStatus.created;
            responseObj.body = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-create: ', e);
    }
    return responseObj;
}


module.exports.update = async function(user) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(user.id)
            },
            model: User,
            projection: {
                _id: false,
                __v: false
            },
            updateQuery: {}
        };

        if (user.name) data.updateQuery.name = user.name;
        if (user.job) data.updateQuery.job = user.job;
        if (user.birthday) data.updateQuery.birthday = user.birthday;

        const responseFromDatabase = await crudRepository.updateData(data);
        if (responseFromDatabase.status) {
            responseObj.status = constants.httpStatus.ok;
            responseObj.body = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-updated: ', e);
    }
    return responseObj;
}

module.exports.delete = async function(userId) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(userId)
            },
            model: User,
            projection: {
                __v: false
            }
        };

        const responseFromDatabase = await crudRepository.deleteData(data);
        if (responseFromDatabase.status) {
            responseObj.status = constants.httpStatus.ok;
            responseObj.body = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-delete: ', e);
    }
    return responseObj;
}

module.exports.getOne = async function(userId) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            id: mongoose.Types.ObjectId(userId),
            model: User,
            projection: {
                __v: false
            }
        };

        const responseFromDatabase = await crudRepository.findById(data);
        if (responseFromDatabase.status) {
            responseObj.status = constants.httpStatus.ok;
            responseObj.body = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-getOne: ', e);
    }
    return responseObj;
}

module.exports.getList = async function(dataFromController) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            findQuery: {},
            model: User,
            projection: {
                __v: false
            }
        };

        if (dataFromController.skip && dataFromController.limit){
            data.skip = dataFromController.skip;
            data.limit = dataFromController.limit;
        } 

        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status) {
            responseObj.status = constants.httpStatus.ok;
            responseObj.body = responseFromDatabase.result;
        }
    } catch (e){
        console.log('ERROR-userService-getOne: ', e);
    }
    return responseObj;
}

module.exports.authenticate = async function(dataFromController) {
    const responseObj = constants.responseObj;
    try {
        const data = {
            findQuery: {
                email: dataFromController.email,
                password: dataFromController.password
            },
            model: User
        };

        const responseFromDatabase = await crudRepository.findOne(data);
        if (responseFromDatabase.status) {
            if (responseFromDatabase.result) {
                responseObj.status = constants.httpStatus.ok;
                responseObj.body = responseFromDatabase.result;
            } else {
                responseObj.status = constants.httpStatus.bad_request;
            }
        }
    } catch (e){
        console.log('ERROR-userService-authenticate: ', e);
    }
    return responseObj;
}