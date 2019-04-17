const _ = require('lodash');
const Make = require('./models/make');
const Model = require('./models/model');
const config = require('./services/config')();
const logger = require('./services/logger')();
const db = require('./services/db');

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

Make.deleteMany()
    .then(() => logger.info('seedDb.Make: models deleted'))
    .then(() => {
        const createMakes = [];
        makes.forEach((make) => {
            createMakes.push(Make.create({
                name: make.name,
                countryOfOrigin: make.countryOfOrigin,
            }));
        });

        return Promise.all(createMakes);
    })
    .then((createdMakes) => {
        Model.deleteMany()
            .then(() => logger.info('seedDb.Model: models deleted'));

        return createdMakes;
    })
    .then((createdMakes) => {
        const createModels = [];
        models.forEach((model) => {
            const make = _.find(createdMakes,
                m => m.name.toLowerCase() === model.make.toLowerCase());
            createModels.push(Model.create({
                name: model.name,
                year: model.year,
                // eslint-disable-next-line no-underscore-dangle
                make: make._id,
            }));
        });

        return Promise.all(createModels);
    })
    .then(__ => logger.info('seedDb:Model: models created'))
    .then(() => db.close());
