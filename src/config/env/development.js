const config = require('./default');

config.env = 'development';
config.logging.morganConfig = 'dev';
config.logging.level = 'debug';
config.logging.format = 'simple';

module.exports = config;
