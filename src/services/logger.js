const { createLogger, format, transports } = require('winston');

// eslint-disable-next-line object-curly-newline
const { combine, timestamp, label, printf, colorize } = format;
const config = require('./config')();

// eslint-disable-next-line object-curly-newline
const logFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

module.exports = () => {
    const getFormat = () => {
        switch (config.logging.format) {
        case 'simple':
            return combine(
                colorize(),
                timestamp(),
                label({ label: config.env }),
                logFormat,
            );
        default:
            return combine(
                colorize(),
                timestamp(),
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
