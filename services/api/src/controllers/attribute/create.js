const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		name: Joi.string()
			.required(),
		description: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const {
					body,
				} = req;

				const resp = await requester.product.post('/attribute/create', body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 400,
						data: {
							message: 'Attribute Create',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
