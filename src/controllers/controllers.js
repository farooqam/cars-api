/* eslint-disable global-require */
module.exports = (server, logger) => {
    return {
        makesController: require('./makesController')(server, logger),
    };
};
