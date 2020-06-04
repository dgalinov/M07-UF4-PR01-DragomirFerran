const searchService = require('../services/searchService');

module.exports.findAll = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const responseFromService = await searchService.findAll();
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Searches founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Searches not foudned';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-searchController-findAll: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.findById = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const id_search = req.params.id;
        const responseFromService = await searchService.findById(id_search);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Searches with id: '+id_search+' founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Searches with id: '+id_search+' not founded';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-searchController-findById: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.delete = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const id_search = req.params.id;
        const responseFromService = await searchService.delete(id_search);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Searches with id:'+id_search+" deleted";
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-searchController-delete: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.create = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = req.body ;
        const responseFromService = await searchService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Search created';
            responseObj.status = 201;
        }
    } catch(error) {
        console.log('ERROR-searchController-create: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.update = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const search = req.body;
        search.id = req.params.id;
        const responseFromService = await searchService.update(search);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Search updated';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-searchController-update: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.dates = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const date1 = req.params.date1;
        const date2 = req.params.date2;
        console.log(date1);
        console.log(date2);
        const responseFromService = await searchService.dates(date1, date2);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Search founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Search not founded'; 
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-searchController-dates: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}