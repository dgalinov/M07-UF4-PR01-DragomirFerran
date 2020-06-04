const questionService = require('../services/questionService');

module.exports.apiSelect = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        let token = req.body;
        if (token.token == ''){
            token = "Not Logged";
        }else{
            token = token.token;
        }

        const responseFromService = await questionService.getQuestion(token);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Question/Date founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Question/Date not founded';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-preguntaController-selectapi: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.findAll = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const responseFromService = await questionService.findAll();
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Questions founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Questions not foudned';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-questionController-findAll: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.findById = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const id_question = req.params.id;
        const responseFromService = await questionService.findById(id_question);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Questions with id: '+id_question+' founded';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Questions with id: '+id_question+' not founded';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-questionController-findById: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.delete = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const id_question = req.params.id;
        const responseFromService = await questionService.delete(id_question);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Questions with id:'+id_question+" deleted";
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-questionController-delete: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.create = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = req.body ;
        const responseFromService = await questionService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Question created';
            responseObj.status = 201;
        }
    } catch(error) {
        console.log('ERROR-questionController-create: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.update = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const question = req.body;
        question.id = req.params.id;
        const responseFromService = await questionService.update(question);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Question updated';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-questionController-update: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}
