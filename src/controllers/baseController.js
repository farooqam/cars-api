const restify = require('restify');
const errors = require('restify-errors');
const halson = require('halson');

class BaseController {
    constructor() {
        this.actions = [];
        this.server = null;
    }

    setupActions(app, swagger) {
        this.server = app;
        this.actions.forEach(action => {
            
        })
    }
}