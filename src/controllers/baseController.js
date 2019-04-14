const restify = require('restify');
const errors = require('restify-errors');
const halson = require('halson');

class BaseController {
    constructor() {
        this.actions = [];
    }

    setupActions(app, swagger) {
        this.actions.forEach(action => {
            const spec = action['spec'];
            const methodName = spec['method']
            //logger.info(`Setting up swagger for ${spec['nickname']} (${methodName})`
            swagger['add' + methodName](action);
            app[methodName.toLowerCase()](spec['path'], spec['path'], action['action']);
        });
    }

    addAction(spec, fn) {
        const newAction = {spec, action: fn.bind(this)};
        this.actions.push(newAction);
    }

    logRestError(type, msg) {
        //logger.error(`Error ${type}: ${msg}`);

        if (errors[type]) {
            return new errors[type](msg);
        } 

        return {error: true, type, msg}
    }

    writeHal(res, obj) {

    }

}