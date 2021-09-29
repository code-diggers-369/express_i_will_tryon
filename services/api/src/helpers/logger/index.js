const winston = require('winston');

const development = process.env.NODE_ENV === 'development';

const defaultMeta = { service: 'API Service', module: 'GLOBAL' };

const format = development
	? winston.format.combine(
		winston.format.colorize(),
		winston.format.simple(),
		winston.format.printf((info) => {
			if (info.level.includes('error') && info.error) {
				return `[${info.module || 'Global'}] ${info.level}: ${info.message}: ${info.error}`;
			}
			return `[${info.module || 'Global'}] ${info.level}: ${info.message}`;
		}),
	)
	: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A ZZ' }),
		winston.format.json(),
	);

/**
  * Initialize winston logger
  * @constant module:Logger~logger
  */
const logger = development ? winston.createLogger({
	level: 'info',
	defaultMeta,
	transports: [
		new winston.transports.Console({
			level: 'silly',
			format,
		}),
	],
}) : winston.createLogger({
	level: 'info',
	defaultMeta,
	transports: [
		new winston.transports.File({
			filename: '../../../logs/error.log',
			level: 'error',
		}),
		new winston.transports.File({
			filename: '../../../logs/combined.log',
		}),
		new winston.transports.Console({
			level: 'silly',
			format,
		}),
	],
});

module.exports = logger;
