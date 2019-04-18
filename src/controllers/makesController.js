/* eslint-disable func-names */
const httpStatus = require('http-status-codes');
const errors = require('restify-errors');
const Make = require('../models/make');
const queryOptions = require('../models/constants').QUERYOPTIONS;

const controller = (server, logger) => {
    server.get('/makes', (req, res, next) => {
        logger.debug(`makesRouter.get.${req.cid}`);

        Make.find({}, queryOptions.EXCLUDE_METADATA_ATTRIBUTES)
            .then((foundMakes) => {
                res.send(httpStatus.OK, foundMakes);
                next();
            })
            .catch((error) => {
                next(new errors.InternalServerError(error));
            });
    });

    return server;
};

module.exports = controller;
