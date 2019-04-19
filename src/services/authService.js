const errors = require('restify-errors');
const cryptoService = require('./crypto');
const config = require('./config')();
const logger = require('./logger')();

const apiKeyAuthorizationHandler = (req, res, next) => {
    const { headers } = req;
    const reqSignature = headers['x-c-signature'];

    if (reqSignature) {
        const expectedSignature = cryptoService.signData(config.apiKey, config.secret);

        if (expectedSignature === reqSignature) {
            logger.info(`index.pre.auth.${req.cid} Authorized request.`);
            next();
            return;
        }
    }

    logger.error(`index.pre.auth.${req.cid} Unauthoried request.`);
    next(new errors.UnauthorizedError());
};

module.exports = {
    apiKeyAuthorizationHandler,
};
