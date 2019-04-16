const restify = require('restify');
const morgan = require('morgan');
const config = require('./services/config')();
const logger = require('./services/logger')();
const db = require('./services/db');

const restifyPlugins = restify.plugins;

db.connect(config, logger);

const server = restify.createServer(config.server);
server.use(morgan(config.logging.morgan.config, { stream: logger.stream }));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.bodyParser());

restify.defaultResponseHeaders = (_data) => {
    this.header('Access-Control-Allow-Origin', '*');
};

const makesRouter = require('./routers/makesRouter')(logger);

makesRouter.applyRoutes(server);

server.listen(config.server.port, () => logger.info(`Server listening on port ${config.server.port}.`));
