const async = require('async');
const { Joi } = require('celebrate');

const handleResponse = require('../../helpers/handleResponse');

const Company = require('../../schemas/Company');

const schema = {
	body: Joi.object({
		name: Joi.string(),
		gstNumber: Joi.string(),
		panNumber: Joi.string(),
		primaryUser: Joi.string(),
		resellerId: Joi.string(),
		supplierId: Joi.string(),
		retailerId: Joi.string(),
	})
		.required()
		.min(1),
};

const request = async (req, res) => {
	async.auto({
		verification: [
			async () => {
				const { companyId } = req.params;
				const { body } = req;

				const query = [];

				Object.keys(body).forEach((key) => {
					const temp = {};
					temp[`${key}`] = body[key];
					query.push(temp);
				});

				const companyCheck = await Company.findOne({
					_id: { $ne: companyId },
					$or: [...query],
				});

				if (companyCheck) {
					throw new Error(JSON.stringify({
						errorkey: 'verification',
						body: {
							status: 409,
							data: { message: 'Company Already Exists' },
						},
					}));
				}
			},
		],
		edit: [
			'verification',
			async () => {
				const { companyId } = req.params;
				const { body } = req;

				const res = await Company.findOneAndUpdate({
					_id: companyId,
				}, body, { returnOriginal: false });

				if (res) {
					return { message: 'Company Updated', company: res };
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
