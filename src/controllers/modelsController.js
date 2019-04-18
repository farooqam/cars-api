/* eslint-disable func-names */
const { ObjectId } = require('mongoose').Types;
const httpStatus = require('http-status-codes');
const errors = require('restify-errors');
const Model = require('../models/model');
const Make = require('../models/make');
const queryOptions = require('../models/constants').QUERYOPTIONS;

const createResponseModel = (make, models) => {
    const repsonseModels = [];

    models.forEach((model) => {
        repsonseModels.push({
            make,
            name: model.name,
            year: model.year,
        });
    });

    return repsonseModels;
};

const controller = (server, logger) => {
    server.get('/models/:make', (req, res, next) => {
        logger.debug(`modelsController.get.${req.cid} make=${req.params.make}`);

        Make.findOne({ name: req.params.make }).collation({ locale: 'en', strength: 1 })
            .then((foundMake) => {
                if (!foundMake) {
                    throw new errors.NotFoundError();
                }
                // eslint-disable-next-line no-underscore-dangle
                logger.debug(`modelsController.get.${req.cid} Getting models for make = ${foundMake.name} with id = ${foundMake._id.toString()}`);
                return Model.find({
                    // eslint-disable-next-line no-underscore-dangle
                    make: ObjectId(foundMake._id.toString()),
                }, queryOptions.EXCLUDE_METADATA_ATTRIBUTES);
            })
            .then((foundModels) => {
                res.send(httpStatus.OK, createResponseModel(req.params.make, foundModels));
                next();
            })
            .catch((error) => {
                if (error.name.startsWith('Mongo')) {
                    next(new errors.InternalServerError(error));
                } else {
                    next(error);
                }
            });
    });

    return server;
};

module.exports = controller;
