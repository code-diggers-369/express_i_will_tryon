const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Variant = require('../../schemas/variant');

const schema = {
	body: Joi.object({
		productId: Joi.string(),
		quantity: Joi.number()
			.min(0),
	}),
};

const request = async (req, res) => {
	async.auto({
		edit: [
			async () => {
				const { body } = req;
				const { variantId } = req.params;

				const res = await Variant.findOneAndUpdate({
					_id: variantId,
				}, body, { returnOriginal: false });

				if (res) {
					return { message: 'Variant Updated', prooduct: res };
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
