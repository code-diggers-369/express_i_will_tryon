const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		list: [
			async () => {
				const resp = await requester.product.get(`/variant${req.url}`, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'list',
					body: {
						status: 404,
						data: {
							message: 'variant Not Found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'list'));
};

module.exports = { schema, request };
