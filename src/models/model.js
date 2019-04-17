const mongoose = require('mongoose');
const constants = require('./constants');

const { Schema } = mongoose;

const modelSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        max: constants.MEDIUMSTRING,
    },
    year: {
        type: 'number',
        required: true,
        format: 'date',
        min: constants.MODEL_YEAR_RANGE.min,
        max: constants.MODEL_YEAR_RANGE.max,
    },
    make: {
        type: Schema.Types.ObjectId,
        ref: 'Make',
    },
},
{ timestamps: true });

module.exports = mongoose.model('Model', modelSchema);
