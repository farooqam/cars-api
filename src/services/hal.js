const halson = require('halson');

const writeHal = (res, obj) => {
    let objCopy = obj;

    if (Array.isArray(objCopy)) {
        const newArr = objCopy.map(item => item.toHAL());
        objCopy = halson(newArr);
    } else if (objCopy && objCopy.toHAL) {
        objCopy = objCopy.toHAL();
    }
    if (!obj) {
        objCopy = {};
    }
    res.json(objCopy);
};

module.exports = writeHal;
