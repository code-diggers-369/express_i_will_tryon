const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const User = require('../../schemas/User');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		main: [
			async () => {
				const { userId } = req.params;

				const user = await User.findOne({ _id: userId });

				if (user) {
					return {
						message: 'User found',
						user,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'main',
					body: {
						status: 404,
						data: {
							message: 'No such user found',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'main'));
};

module.exports = { schema, request };
