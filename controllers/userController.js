const userService = require('../services/userService');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');

module.exports.create = async function(req, res) {
    let responseObj = constants.responseObj;
    try {
        const user = req.body;
        const responseFromService = await userService.create(user);
        if (responseFromService.status === constants.httpStatus.created) {
            responseObj = responseFromService;
            responseObj.message = constants.controllerMessages.userCreated;
        }
    } catch(e) {
        console.log('ERROR-userController-create: ', e);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.login = async function(req, res) {
    let responseObj = constants.responseObj;
    try {
        const page = req.body;
        const responseFromService = await userService.authenticate(page);
        if (responseFromService.status === constants.httpStatus.ok) {
            const token = jwt.sign(
                {
                    id: responseFromService.body._id,
                },
                constants.secret_key,
                { expiresIn: '2h'}
            );
            responseObj.body = token;
            responseObj.message = constants.controllerMessages.userAuthenticated;
        } else if (responseFromService.status === constants.httpStatus.bad_request) {
            responseObj = responseFromService;
            responseObj = constants.controllerMessages.userInvalidCredentials;
        }
    } catch(e) {
        console.log('ERROR-userController-authenticate: ', e);
    }
    return res.status(responseObj.status).send(responseObj);
}
