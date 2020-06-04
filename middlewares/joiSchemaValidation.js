const Joi = require('@hapi/joi');
const constants = require('../config/constants');

module.exports.validate = (schema, validation) => {
    return (req, res, next) => {
        let objToValidate = {};
        if (validation === constants.requestObj.BODY_PARAMS) objToValidate = req.body;
        else if (validation === constants.requestObj.QUERY_PARAMS) objToValidate = req.query;
        else if (validation === constants.requestObj.PATH_PARAMS) objToValidate = req.params;

        const result = schema.validate(objToValidate);

        if (result.error) {
            const errorDetails = result.error.details.map((value) => {
                return value.message;
            });
            const responseObj = {
                status: constants.httpStatus.bad_request,
                body: errorDetails
            }
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    };
};