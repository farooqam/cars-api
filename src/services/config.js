/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
module.exports = () => {
    const env = process.env.NODE_ENV;

    try {
        if (!env || env.length === 0) {
            return require('../config/env/default');
        }

        return require(`../config/env/${env}`);
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            return require('../config/env/default');
        }

        throw error;
    }
};
