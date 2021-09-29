const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Retailer = require('../../schemas/Retailer');

const schema = { body: Joi.object({}) };

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { retailerId } = req.params;

				const retailer = await Retailer.findOne({ _id: retailerId });

				if (retailer) {
					return {
						message: 'Retailer Found',
						retailer,
					};
				}
				throw new Error(JSON.stringify({
					status: 404,
					data: {
						message: 'No such retailer found',
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
