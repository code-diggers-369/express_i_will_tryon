const async = require('async');
const { Joi } = require('celebrate');

const handleResponse = require('../../helpers/handleResponse');

const Retailer = require('../../schemas/Retailer');

const schema = {
	body: Joi.object({
		users: Joi.array()
			.items(Joi.string()),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const { body } = req;
				const retailer = new Retailer(body);
				const res = await retailer.save();

				if (res) {
					return {
						message: 'New retailer created',
						company: res,
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 500,
						data: {
							message: 'Internal Server Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
