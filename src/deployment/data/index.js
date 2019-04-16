/* eslint-disable global-require */
const makes = require('../data/makes');

module.exports = [
    {
        model: require('../../models/make'),
        name: 'make',
        friendlyName: 'Makes',
        values: makes,
        mapping(m) {
            return {
                name: m.name,
                countryOfOrigin: m.countryOfOrigin,
            };
        },
    },
];
