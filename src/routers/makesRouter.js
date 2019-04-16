/* eslint-disable func-names */
const { Router } = require('restify-router');
const httpStatus = require('http-status-codes');
const errors = require('restify-errors');
const Make = require('../models/make');
const queryOptions = require('../models/constants').QUERYOPTIONS;

const router = (logger) => {
    const get = (_req, res, _next) => {
        logger.debug('makesRouter.get');

        Make.find({}, queryOptions.EXCLUDE_METADATA_ATTRIBUTES).exec((error, makes) => {
            if (error) {
                return _next(new errors.InternalServerError(error));
            }
            return res.send(httpStatus.OK, makes);
        });
    };

    const r = new Router();
    r.get('/makes', get);

    return r;
};

module.exports = router;
