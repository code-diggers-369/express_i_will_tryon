const async = require('async');
const { Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleResponse = require('../../helpers/handleResponse');

// schemas
const User = require('../../schemas/User');

const schema = {
	body: Joi.object({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		login: [
			async () => {
				const { email, password } = req.body;

				const user = await User.findOne({
					email,
				});

				if (user && (await bcrypt.compare(password, user.passwordHash))) {
					// Create token
					const token = jwt.sign(
						{ _id: user._id, email: user.email },
						process.env.TOKEN_KEY,
						{ expiresIn: '2h' },
					);

					// save user token
					user.token = token;
					user.save();

					// user
					return {
						message: 'User Authenticated',
						user,
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'login',
					body: {
						status: 400,
						data: {
							message: 'Invalid Credentials',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'login'));
};

module.exports = { schema, request };
