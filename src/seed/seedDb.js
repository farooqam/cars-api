const Make = require('../models/make');
const Model = require('../models/model');
const config = require('../services/config')();
const logger = require('../services/logger')();
const db = require('../services/db');

const makes = [
    {
        name: 'Ford',
        countryOfOrigin: 'USA',
    },
    {
        name: 'BMW',
        countryOfOrigin: 'GER',
    },
    {
        name: 'Kia',
        countryOfOrigin: 'KOR',
    },
];

const models = [
    {
        name: 'Edge',
        year: 2019,
        make: 'Ford',
    },
    {
        name: 'Soul',
        year: 2020,
        make: 'Kia',
    },
    {
        name: 'X7',
        year: 2019,
        make: 'BMW',
    },
];

db.connect(config, logger);

// Delete all makes then insert.
Make.deleteMany().then(() => logger.info('seedDb.Make: models deleted'))
    .then(() => {
        makes.forEach((make) => {
            Make.create({
                name: make.name,
                countryOfOrigin: make.countryOfOrigin,
            })
                .then(() => {
                    logger.info('seedDb.Make: models created');
                })
                .then(() => {
                    Model.deleteMany().then(() => logger.info('seedDb.Model: models deleted'));
                })
                .then(() => {
                    models.forEach((model) => {
                        Make.findOne({ name: model.make })
                            .then((m) => {
                                Model.create({
                                    name: model.name,
                                    year: model.year,
                                    m,
                                })
                                    .then(() => {
                                        logger.info('seedDb.Model: models created');
                                    });
                            });
                    });
                });
        });
    });
