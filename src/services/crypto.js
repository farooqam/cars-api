const crypto = require('crypto');

const signData = (data, secretKey) => {
    const hmac = crypto.createHmac('sha256', secretKey).update(data).digest('hex');
    return hmac;
};

module.exports = {
    signData,
};
