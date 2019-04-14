/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const create = (env) => {
    try {
        if (!env || env.length === 0) {
            return require('./env/default');
        }

        return require(`./env/${env}`);
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            return require('./env/default');
        }

        throw error;
    }
};

module.exports = {
    create,
};
