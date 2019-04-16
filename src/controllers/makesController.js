/* eslint-disable func-names */
const httpStatus = require('http-status-codes');
const errors = require('restify-errors');
const Make = require('../models/make');
const queryOptions = require('../models/constants').QUERYOPTIONS;

const addController = (server, logger) => {
    server.get('/makes', (req, res, next) => {
        logger.debug(`makesRouter.get.${req.cid}`);

        Make.find({}, queryOptions.EXCLUDE_METADATA_ATTRIBUTES).exec((error, makes) => {
            if (error) {
                return next(new errors.InternalServerError(error));
            }
            return res.send(httpStatus.OK, makes);
        });
    });

    return server;
};

module.exports = addController;
