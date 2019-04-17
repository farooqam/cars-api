/* eslint-disable global-require */
module.exports = {
    config: require('./config')(),
    db: require('./db'),
    logger: require('./logger')(),
};
