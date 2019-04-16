const seeder = require('./services/dbSeeder');
const config = require('./services/config')();
const logger = require('./services/logger')();
const db = require('./services/db');

db.connect(config, logger);
seeder.seed(logger);
