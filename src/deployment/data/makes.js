const seedData = [
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

const seedConfig = {
    // eslint-disable-next-line global-require
    model: require('../../models/make'),
    name: 'make',
    friendlyName: 'Makes',
    values: seedData,
    mapping(model) {
        return {
            name: model.name,
            countryOfOrigin: model.countryOfOrigin,
        };
    },
};

module.exports = seedConfig;
