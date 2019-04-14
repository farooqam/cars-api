const config = {
    name: 'Cars API',
    version: 1,
    port: 3000,
    secret: 'c4bf2597-7e36-4420-aa4a-e27e2f740ad3',
    logging: {
        level: 'error',
        morganConfig: 'tiny',
    },
    database: {
        host: 'localhost',
        name: 'carsdb',
    },
};

module.exports = config;
