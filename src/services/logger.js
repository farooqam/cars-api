const { createLogger, format, transports } = require('winston');
const config = require('./config')();

module.exports = () => {
    const getFormat = () => {
        switch (config.logging.format) {
        case 'simple':
            return format.combine(
                format.colorize(),
                format.timestamp(),
                format.simple(),
            );
        default:
            return format.combine(
                format.colorize(),
                format.timestamp(),
                format.json(),
            );
        }
    };

    const logger = createLogger({
        level: config.logging.level,
        format: getFormat(),
        transports: [new transports.Console()],
    });

    logger.stream = {
        write(message, _encoding) {
            logger.info(message);
        },
    };

    return logger;
};
