const restify = require('restify');
const minimist = require('minimist');
const config = require('./services/config')();
const logger = require('./services/logger')();
const db = require('./services/db');

const restifyPlugins = restify.plugins;

db.connect(config, logger);

const commandArgs = minimist(process.argv.slice(2));

if (commandArgs) {
    if (commandArgs.seed) {
        // eslint-disable-next-line global-require
        const seeder = require('./services/dbSeeder');
        seeder.seed(logger);
    }
}

const server = restify.createServer(config.server);
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.bodyParser());

restify.defaultResponseHeaders = (_data) => {
    this.header('Access-Control-Allow-Origin', '*');
};

const makesRouter = require('./routers/makesRouter')(logger);

makesRouter.applyRoutes(server);

server.listen(config.server.port, () => logger.info(`Server listening on port ${config.server.port}.`));
