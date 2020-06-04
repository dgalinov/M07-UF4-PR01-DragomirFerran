const constants = require('../config/constants');
const jwt = require('jsonwebtoken');

module.exports.validate = (req, res, next) => {
    const responseObj = { status: 400 };

    const bearerToken = req.headers.authorization;
    if (bearerToken && bearerToken.split(' ')[0] === 'Bearer' && bearerToken.split(' ')[1]) {
        const token = bearerToken.split(' ')[1];
        try {
            const token_decoded = jwt.verify(token, constants.secret_key);
            req.token = token_decoded;
            next();
        } catch (error) {
            responseObj.message = 'Invalid token';
            console.log('ERROR Invalid Token', error);
            return res.status(responseObj.status).send(responseObj);
        }
    } else {
        responseObj.message = 'Bearer token missing from header';
        console.log('ERROR Missig token');
        return res.status(responseObj.status).send(responseObj);
    }
}