const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = (config, logger) => {
    mongoose.connect(
        `${config.database.host}/${config.database.name}`, {
            connectTimeoutMS: config.database.connectTimeoutMs,
            useNewUrlParser: true,
        },
    );

    mongoose.connection.once('open', () => logger.info('db.connect: Connected to database.'));
    mongoose.connection.on('error', error => logger.error(`db.connect: ${error}`));
};

const close = () => {
    mongoose.connection.close();
};

module.exports = {
    connect,
    close,
};
