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

module.exports = {
    // eslint-disable-next-line global-require
    model: require('../../models/make'),
    name: 'make',
    friendlyName: 'Makes',
    values: makes,
    mapping(model) {
        return {
            name: model.name,
            countryOfOrigin: model.countryOfOrigin,
        };
    },
};
