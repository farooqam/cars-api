/* eslint-disable func-names */
const halson = require('halson');

const { Router } = require('restify-router');

const router = (logger) => {
    const get = (_req, res, _next) => {
        const makes = [
            { name: 'Ford', countryOfOrigin: 'USA' },
            { name: 'BMW', countryOfOrigin: 'GER' },
            { name: 'Kia', countryOfOrigin: 'KOR' },
        ];

        logger.debug('makesRouter.get');
        res.send(halson(makes));
    };

    const r = new Router();
    r.get('/makes', get);

    return r;
};

module.exports = router;
