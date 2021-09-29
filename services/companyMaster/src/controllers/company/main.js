const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Company = require('../../schemas/Company');

const schema = { body: Joi.object({}) };

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { companyId } = req.params;

				const company = await Company.findOne({ _id: companyId });

				if (company) {
					return {
						message: 'Company Found',
						company,
					};
				}
				throw new Error(JSON.stringify({
					status: 404,
					data: {
						message: 'No such company found',
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
