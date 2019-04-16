
const db = require('./db');
const seedConfigs = require('../seed/configs/configs');
const logger = require('./logger')();

const seed = () => {
    seedConfigs.forEach((sc) => {
        const { model } = sc;

        model.deleteMany().exec()
            .then(() => logger.info(`seeder.seed.${sc.friendlyName}: models deleted`))
            .then(() => {
                const commands = [];
                sc.values.forEach((val) => {
                    commands.push(
                        model.create(sc.mapping(val)),
                    );
                });

                logger.info(`seeder.seed.${sc.friendlyName}: models created`);
                return commands;
            })
            .then((commands) => {
                Promise.all(commands)
                    .then(_r => db.close())
                    .catch(error => logger.error(`seeder.seed.${sc.friendlyName}: ${error}`));
            });
    });
};

module.exports = {
    seed,
};
