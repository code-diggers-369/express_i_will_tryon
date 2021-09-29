const logger = require('./index');

logger.stream = {
	write(msg) {
		msg = msg.replace('\n', '');
		const [type, route, status, responseTime, requestId, requestIp] = msg.split(' ');
		const express = {
			type,
			route,
			status,
			responseTime,
		};
		msg = msg.replace(requestId, '').replace(requestIp, '');
		logger.log('info', msg, {
			module: 'EXPRESS',
			express,
			requestId,
			requestIp,
		});
	},
};

module.exports = logger;
