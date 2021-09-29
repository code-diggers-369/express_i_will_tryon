const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Variant = require('../../schemas/variant');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { variantId } = req.params;

				const variant = await Variant.findOne({ _id: variantId });

				if (variant) {
					return {
						message: 'Variant found',
						variant,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'main',
					body: {
						status: 404,
						data: {
							message: 'No such Variant found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
