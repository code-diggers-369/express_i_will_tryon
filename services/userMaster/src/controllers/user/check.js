const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		check: [
			async () => ({
				message: 'User Authenticated',
				user: req.user,
			}),
		],
	}, handleResponse(req, res, 'check'));
};

module.exports = { schema, request };
