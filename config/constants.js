module.exports = {
    responseObj: {
        status: 500,
        message: 'Internal server error',
        body: {}
    },
    httpStatus: {
        ok: 200,
        created: 201,
        noContent: 204,
        bad_request: 400
    },
    controllerMessages: {
        userListFound: 'User list found',
        userCreated: 'User created successfully',
        userUpdated: 'User updated successfully',
        userRemoved: 'User removed successfully',
        userFetched: 'User fetched successfully',
        userListFetched: 'User list fetched successfully',
        userAuthenticated: 'User authenticated successfully',
        userInvalidCredentials: 'Email or password is incorrect'
    },
    requestObj: {
        BODY_PARAMS: 'body',
        QUERY_PARAMS: 'query',
        PATH_PARAMS: 'path'
    },
    secret_key: 'pregunta2'
}