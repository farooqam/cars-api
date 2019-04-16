const mongoose = require('mongoose');
const constants = require('./constants');

const { Schema } = mongoose;

const makeSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        unique: true,
        max: constants.MEDIUMSTRING,
    },
    countryOfOrigin: {
        type: 'string',
        required: true,
        unique: true,
        max: constants.MEDIUMSTRING,
    },
},
{ timestamps: true });

module.exports = mongoose.model('Make', makeSchema);
