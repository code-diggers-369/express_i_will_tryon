const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Admin = require('../../schemas/Admin');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { adminId } = req.params;

				const admin = await Admin.findOne({ _id: adminId });

				if (admin) {
					return {
						message: 'Admin found',
						admin,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'main',
					body: {
						status: 404,
						data: {
							message: 'No such Admin found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
