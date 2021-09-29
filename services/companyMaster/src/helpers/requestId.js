const { nanoid } = require('nanoid');

module.exports = (req, res, next) => {
	req.meta = { requestId: nanoid() };
	next();
};
