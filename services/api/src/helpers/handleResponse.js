const logger = require('./logger');
// const handleNotification = require('./handleNotification');

const method = (req, res, resultKey) => (err, results) => {
	if (err) {
		try {
			err = JSON.parse(err.message);
			logger.log('error', `${err.body.data.message}`, { module: 'EXPRESS' });
			const status = err.body.status ? err.body.status : 500;
			const data = err.body ? err.body.data.message : { message: 'Some error occurred in Api' };
			data.requestId = req.meta.requestId;
			res.status(status).json(data);
		} catch (e) {
			// console.log(err);
			if (!err.response) logger.log('error', `${err.response.data.message}`, { module: 'EXPRESS' });
			const status = err.response ? err.response.status : 500;
			const data = err.response ? err.response.data.message : { message: 'Some error occurred in Api' };
			data.requestId = req.meta.requestId;
			res.status(status).json(data);
		}
	} else {
		// handleNotification(req, res);
		res.json(results[resultKey]);
	}
};

module.exports = method;
