
const db = require('./db');
const seedData = require('../deployment/data/index');

const seed = (logger) => {
    seedData.forEach((sd) => {
        const { model } = sd;

        model.deleteMany().exec()
            .then(() => logger.info(`seeder.seed.${sd.friendlyName}: models deleted`))
            .then(() => {
                const commands = [];
                sd.values.forEach((val) => {
                    commands.push(
                        model.create(sd.mapping(val)),
                    );
                });

                logger.info(`seeder.seed.${sd.friendlyName}: models created`);
                return commands;
            })
            .then((commands) => {
                Promise.all(commands)
                    .then(_r => db.close())
                    .catch(error => logger.error(`seeder.seed.${sd.friendlyName}: ${error}`));
            });
    });
};

module.exports = {
    seed,
};
