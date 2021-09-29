const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Reseller = require('../../schemas/Reseller');

const schema = { body: Joi.object({}) };

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { resellerId } = req.params;

				const reseller = await Reseller.findOne({ _id: resellerId });

				if (reseller) {
					return {
						message: 'Reseller Found',
						reseller,
					};
				}
				throw new Error(JSON.stringify({
					status: 404,
					data: {
						message: 'No such reseller found',
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
