const requester = require('../helpers/axios');

const verifyToken = async (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

	if (!token) {
		return res.status(403).send('A token is required for authentication');
	}
	try {
		const decoded = await requester.user.get('/customer/check', {
			headers: {
				authorization: req.headers.authorization,
			},
		});
		req.user = decoded;
	} catch (err) {
		// console.log(err);
		return res.status(401).send('Invalid Customer Token');
	}
	return next();
};

module.exports = verifyToken;
