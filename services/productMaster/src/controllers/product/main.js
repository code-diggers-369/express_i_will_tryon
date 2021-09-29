const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Product = require('../../schemas/product');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { productId } = req.params;

				const product = await Product.findOne({ _id: productId });

				if (product) {
					return {
						message: 'Product found',
						product,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'main',
					body: {
						status: 404,
						data: {
							message: 'No such Product found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
