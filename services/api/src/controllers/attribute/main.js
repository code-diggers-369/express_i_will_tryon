const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const resp = await requester.product.get(`/attribute${req.url}`, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'main',
					body: {
						status: 404,
						data: {
							message: 'Attribute Not Found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
