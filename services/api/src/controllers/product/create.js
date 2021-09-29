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
		shortDescriptions: Joi.string()
			.required(),
		slug: Joi.string()
			.required(),
		attributes: [Joi.string()],
		variants: [Joi.string()],
		categories: [Joi.string()],
		quantity: Joi.number(),
		approved: Joi.boolean()
			.default(false),
		published: Joi.boolean()
			.default(false),
		price: Joi.number()
			.required(),
		discountedPrice: Joi.number()
			.required(),
		supplierId: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		supplierVerification: [
			async () => {
				const { supplierId } = req.body;
				const resp = await requester.user.get(`/supplier/${supplierId}`, { headers: req.headers });
				if (resp.status === 200) {
					return {
						message: 'Supplier Verified',
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'supplierVerification',
					body: {
						status: 404,
						data: {
							message: 'Invalid Supplier Company',
						},
					},
				}));
			},
		],
		create: [
			'supplierVerification',
			async () => {
				const {
					body,
				} = req;

				const resp = await requester.product.post('/product/create', body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 400,
						data: {
							message: 'Product Create',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
