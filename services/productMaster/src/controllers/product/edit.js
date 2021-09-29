const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Product = require('../../schemas/product');

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
		edit: [
			async () => {
				const { body } = req;
				const { productId } = req.params;

				const res = await Product.findOneAndUpdate({
					_id: productId,
				}, body, { returnOriginal: false });

				if (res) {
					return { message: 'Product Updated', prooduct: res };
				}
				throw new Error(JSON.stringify({
					errorkey: 'edit',
					body: {
						status: 500,
						data: { message: 'Internal Server Error' },
					},
				}));
			},
		],
	}, handleResponse(req, res, 'edit'));
};

module.exports = { schema, request };
