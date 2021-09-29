const async = require('async');
const { Joi } = require('celebrate');

const handleResponse = require('../../helpers/handleResponse');

const Company = require('../../schemas/Company');

const schema = {
	body: Joi.object({
		name: Joi.string()
			.required(),
		gstNumber: Joi.string()
			.required(),
		panNumber: Joi.string()
			.required(),
		primaryUser: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		verification: [
			async () => {
				const { body } = req;
				const companyCheck = await Company.findOne({
					$or: [
						{ name: body.name },
						{ gstNumber: body.gstNumber },
						{ panNumber: body.panNumber },
					],
				});
				if (companyCheck) {
					throw new Error(JSON.stringify({
						errorkey: 'verification',
						body: {
							status: 409,
							data: {
								message: 'Company Already Exists',
							},
						},
					}));
				}
			},
		],
		create: [
			'verification',
			async () => {
				const { body } = req;
				const company = new Company(body);
				const res = await company.save();

				if (res) {
					return {
						message: 'New company created',
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
