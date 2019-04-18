/* eslint-disable func-names */
const { ObjectId } = require('mongoose').Types; 
const httpStatus = require('http-status-codes');
const errors = require('restify-errors');
const Model = require('../models/model');
const Make = require('../models/make');
const queryOptions = require('../models/constants').QUERYOPTIONS;

const controller = (server, logger) => {
    server.get('/models/:make', (req, res, next) => {
        logger.debug(`modelsController.get.${req.cid} make=${req.params.make}`);

        Make.findOne({ name: req.params.make })
            .then((foundMake) => {
                // eslint-disable-next-line no-underscore-dangle
                logger.debug(`modelsController.get.${req.cid} Getting models for make = ${foundMake.name} with id = ${foundMake._id.toString()}`);
                // eslint-disable-next-line no-underscore-dangle
                Model.find({ make: foundMake._id.toString() }, queryOptions.EXCLUDE_METADATA_ATTRIBUTES)
                    .then(foundModels => foundModels);
            })
            .then((foundModels) => {
                res.send(httpStatus.OK, foundModels);
                next();
            })
            .catch((error) => {
                next(new errors.InternalServerError(error));
            });
    });

    return server;
};

module.exports = controller;
