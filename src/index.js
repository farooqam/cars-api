const restify = require('restify');
const configFactory = require('./config/configFactory');
const loggerFactory = require('./logging/loggerFactory');
const db = require('./services/db');
const minimist = require('minimist');

const restifyPlugins = restify.plugins;

const config = configFactory.create(process.env.NODE_ENV);
const logger = loggerFactory.create(config);

db.connect(config, logger);

const commandArgs = minimist(process.argv.slice(2));

if (commandArgs) {
    if (commandArgs.seed) {
        // eslint-disable-next-line global-require
        const seeder = require('./deployment/seeders/makeSeeder');
        seeder.seed(logger);
        process.exit();
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
