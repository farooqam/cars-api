const model = require('../../models/make');
const db = require('../../services/db');

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

const seed = (logger) => {
    model.deleteMany()
        .exec()
        .then(() => logger.info('makesSeeder.seed: Makes deleted.'));

    const commands = [];

    makes.forEach((m) => {
        commands.push(
            model.create({
                name: m.name,
                countryOfOrigin: m.countryOfOrigin,
            }),
        );
    });

    logger.info('makesSeeder.seed: Seeding database.');

    Promise.all(commands)
        .then(_r => db.close())
        .catch(error => logger.error(`makesSeeder.seed: ${error}`));
};

module.exports = {
    seed,
};
