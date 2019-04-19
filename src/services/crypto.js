const crypto = require('crypto');
const config = require('./config');

const validateKey = (hmacData, key) => {
    const hmac = crypto.createHmac('md5', config.secret).update(hmacData).digest('hex');
    return hmac === key;
};

module.exports = {
    validateKey,
};
