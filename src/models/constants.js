const MEDIUMSTRING = 128;

const MODEL_YEAR_RANGE = {
    min: 1900,
    max: 2020,
};

const QUERYOPTIONS = {
    EXCLUDE_METADATA_ATTRIBUTES: {
        _id: 0, __v: 0, createdAt: 0, updatedAt: 0,
    },
};

module.exports = {
    MEDIUMSTRING,
    QUERYOPTIONS,
    MODEL_YEAR_RANGE,
};
