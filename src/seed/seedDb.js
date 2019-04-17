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

let promises = [];

Make.deleteMany()
    .then(() => logger.info('seedDb.Make: models deleted'))
    .then(() => {
        promises = [];
        makes.forEach((make) => {
            promises.push(Make.create({
                name: make.name,
                countryOfOrigin: make.countryOfOrigin,
            }));
        });

        return promises;
    })
    .then((p) => {
        Promise.all(p)
            .then(_ => logger.info('seedDb.Make: models created.'))
            .then(() => Model.deleteMany())
            .then(() => {
                models.forEach((model) => {
                    Make.findOne({ name: model.make })
                        .then((make) => {
                            Model.create({
                                name: model.name,
                                year: model.year,
                                make,
                            })
                                .then(() => logger.info('seedDb.Model: model created'));
                        });
                });
            });
    });
