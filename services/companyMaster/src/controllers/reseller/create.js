const async = require('async');
const { Joi } = require('celebrate');

const handleResponse = require('../../helpers/handleResponse');

const Reseller = require('../../schemas/Reseller');

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
				const reseller = new Reseller(body);
				const res = await reseller.save();

				if (res) {
					return {
						message: 'New reseller created',
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
