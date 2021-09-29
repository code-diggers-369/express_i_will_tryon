const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		firstName: Joi.string()
			.required(),
		lastName: Joi.string()
			.required(),
		phone: Joi.number()
			.min(1000000000)
			.max(9999999999)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		register: [
			async () => {
				const resp = await requester.user.post('/customer/register', {
					...req.body,
				}, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'register',
					body: {
						status: 500,
						data: {
							message: 'Internal Server Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'register'));
};

module.exports = { schema, request };
