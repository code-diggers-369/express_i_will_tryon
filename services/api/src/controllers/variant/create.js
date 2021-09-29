const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		productId: Joi.string()
			.required(),
		quantity: Joi.number()
			.min(0)
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		productVerification: [
			async () => {
				const { productId } = req.body;
				const resp = await requester.product.get(`/product/${productId}`, { headers: req.headers });
				if (resp.status === 200) {
					return {
						message: 'Product Verified',
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'productVerification',
					body: {
						status: 404,
						data: {
							message: 'Invalid Product',
						},
					},
				}));
			},
		],
		create: [
			'productVerification',
			async () => {
				const { body } = req;
				const resp = await requester.product.post('/variant/create', body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 400,
						data: {
							message: 'Variant Create',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
