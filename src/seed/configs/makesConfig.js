/* eslint-disable global-require */
const seedConfig = {
    model: require('../../models/make'),
    name: 'make',
    friendlyName: 'Makes',
    values: require('../data/makes'),
    mapping(model) {
        return {
            name: model.name,
            countryOfOrigin: model.countryOfOrigin,
        };
    },
};

module.exports = seedConfig;
