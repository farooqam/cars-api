/* eslint-disable func-names */
const halson = require('halson');

const { Router } = require('restify-router');

const router = (logger) => {
    const get = (_req, res, _next) => {
        const makes = [
            'Ford',
            'BMW',
            'Kia',
        ];

        logger.debug('makesRouter.get');
        res.send(halson(makes));
    };

    const r = new Router();
    r.get('/makes', get);

    return r;
};

module.exports = router;
