const requester = require('../helpers/axios');

const verifyToken = async (req, res, next) => {
	const token = req.headers.adminkey;

	if (!token) {
		return res.status(403).send('A admin token is required for authentication');
	}
	try {
		const decoded = await requester.user.get('/admin/check', {
			headers: {
				adminKey: token,
			},
		});
		req.admin = decoded;
	} catch (err) {
		// console.log(err);
		return res.status(401).send('Invalid Token');
	}
	return next();
};

module.exports = verifyToken;
