const logger = require('./logger');
// const handleNotification = require('./handleNotification');

const method = (req, res, resultKey) => (err, results) => {
	if (err) {
		try {
			err = JSON.parse(err.message);
			// if (!err.body) logger.log('error', `${err.message} ${err.stack}`, { module: 'EXPRESS' });
			const status = err.status ? err.status : 500;
			const data = err.data ? err.data : { message: 'Some error occurred in Api' };
			data.requestId = req.meta.requestId;
			logger.log('error', `${data.message} ${data.status}`, { module: 'EXPRESS' });
			res.status(status).json(data);
		} catch (e) {
			res.status(500).json({
				message: e.message,
			});
		}
	} else {
		// handleNotification(req, res);
		res.json(results[resultKey]);
	}
};

module.exports = method;
