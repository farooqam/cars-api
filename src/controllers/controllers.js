/* eslint-disable global-require */
module.exports = (server, logger) => ({
    makesController: require('./makesController')(server, logger),
    modelsController: require('./modelsController')(server, logger),
});
