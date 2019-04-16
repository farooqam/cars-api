const config = {
    env: 'default',
    server: {
        name: 'Cars API',
        version: 1,
        port: 3000,
        handleUncaughtExceptions: true,
    },
    secret: 'c4bf2597-7e36-4420-aa4a-e27e2f740ad3',
    logging: {
        level: 'error',
        format: 'json',
        morgan: {
            config: 'combined',
        },
    },
    database: {
        host: 'mongodb://localhost:27017',
        name: 'carsdb',
        connectTimeoutMs: 5000,
    },
};

module.exports = config;
