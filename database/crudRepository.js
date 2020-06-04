const mongoose = require('mongoose');

module.exports.insertData = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.save();
        //success
        responseObj = {
            result: docs,
            status: true
        };
    } catch(err) {
        //error
        responseObj = {
            error: err,
            status: false
        };
    }
    return responseObj;
};

module.exports.saveData = async (objToSave) => {
    let responseObj = { status: false };
    try {
        const doc = await objToSave.save();
        responseObj = {
            result: doc,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-save: ', error);
    }
    return responseObj;
};

module.exports.updateData = async (data) => {
    let responseObj = { status: false };
    try {
        const doc = await data.model.findOneAndUpdate(
                            data.findQuery,
                            data.updateQuery, 
                            {new: true, projection: data.projection, useFindAndModify: false}
                        );
        responseObj = {
            result: doc,
            status: true
        };
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-updateData: ', error);
    }
    return responseObj;
};

module.exports.deleteData = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.findOneAndDelete(data.findQuery, {projection: data.projection});
        //success
        responseObj = {
            result: docs,
            status: true
        };
    } catch(err) {
        //error
        responseObj = {
            error: err,
            status: false
        };
    }
    return responseObj;
};

module.exports.find = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.find(data.findQuery, data.projection).skip(data.skip).limit(data.limit);
        //success
        responseObj = {
            result: docs,
            status: true
        };
    } catch(err) {
        //error
        responseObj = {
            error: err,
            status: false
        };
        console.log(err)
    }
    return responseObj;
};

module.exports.findById = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.findById(data.findQuery, data.projection);
        responseObj = {
            result: docs,
            status: true
        };
    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-crud-findById: ', error);
    }
    return responseObj;
};

module.exports.findOne = async (data) => {
    let responseObj = { status: false };
    try {
        const docs = await data.model.findOne(data.findQuery);
        //success
        responseObj = {
            result: docs,
            status: true
        };
    } catch(err) {
        //error
        responseObj = {
            error: err,
            status: false
        };
        console.log(err)
    }
    return responseObj;
};