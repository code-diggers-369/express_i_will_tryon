const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		login: [
			async () => {
				const { email, password } = req.body;

				const resp = await requester.user.post('/customer/login', {
					email,
					password,
				}, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'login',
					body: {
						status: 400,
						data: {
							message: 'Invalid Credentials',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'login'));
};

module.exports = { schema, request };
