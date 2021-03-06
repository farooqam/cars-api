const restify = require('restify');
const morgan = require('morgan');
const httpStatus = require('http-status-codes');
const { cid } = require('restify-correlation-id');
// eslint-disable-next-line object-curly-newline
const { config, logger, db, authService } = require('./services/services');

const restifyPlugins = restify.plugins;

db.connect(config, logger);

const server = restify.createServer(config.server);
server.use(morgan(config.logging.morgan.config, { stream: logger.stream }));
server.use(restifyPlugins.queryParser());
server.use(restifyPlugins.bodyParser());

server.pre(cid());
server.use(authService.apiKeyAuthorizationHandler);

server.on('InternalServer', (req, res, error, cb) => {
    logger.error(`${error}.${req.cid}`);
    res.send(httpStatus.INTERNAL_SERVER_ERROR, {
        message: 'Oops! An error occurred. It\'s not your fault but ours',
        requestId: req.cid,
    });
    cb();
});

restify.defaultResponseHeaders = (_data) => {
    this.header('Access-Control-Allow-Origin', '*');
};

require('./controllers/controllers')(server, logger);

server.listen(config.server.port, () => logger.info(`Server listening on port ${config.server.port}.`));
