const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		name: Joi.string(),
		description: Joi.string(),
		shortDescriptions: Joi.string(),
		slug: Joi.string(),
		attributes: [Joi.string()],
		variants: [Joi.string()],
		categories: [Joi.string()],
		quantity: Joi.number(),
		approved: Joi.boolean(),
		published: Joi.boolean(),
		price: Joi.number(),
		discountedPrice: Joi.number(),
		supplierId: Joi.string()
			.length(),
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
		edit: [
			'supplierVerification',
			async () => {
				const { body } = req;
				const { productId } = req.params;

				const resp = await requester.product.put(`/product/edit/${productId}`, body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'edit',
					body: {
						status: 409,
						data: {
							message: 'Product Edit Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'edit'));
};

module.exports = { schema, request };
