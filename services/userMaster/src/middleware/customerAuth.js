const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];

	if (!token) {
		return res.status(403).send('A customer token is required for authentication');
	}
	try {
		const decoded = jwt.verify(token, process.env.CUSTOMER_TOKEN_KEY);
		req.customer = decoded;
	} catch (err) {
		return res.status(401).send('Unauthorised Customer');
	}
	return next();
};

module.exports = verifyToken;
