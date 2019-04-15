const config = require('./default');

config.env = 'production';
config.logging.morganConfig = 'combined';
config.port = 11233;

module.exports = config;
