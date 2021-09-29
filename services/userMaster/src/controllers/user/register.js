const async = require('async');
const { Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleResponse = require('../../helpers/handleResponse');

// schemas
const User = require('../../schemas/User');

const schema = {
	body: Joi.object({
		username: Joi.string()
			.required(),
		firstName: Joi.string()
			.required(),
		lastName: Joi.string()
			.required(),
		phone: Joi.number()
			.min(1000000000)
			.max(9999999999)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		verification: [
			async () => {
				const { body } = req;
				const userCheck = await User.findOne({
					$or: [
						{ email: body.email },
						{ phone: body.phone },
						{ username: body.username },
					],
				});
				if (userCheck) {
					throw new Error(JSON.stringify({
						errorkey: 'verification',
						body: {
							status: 409,
							data: {
								message: 'User Already Exists',
							},
						},
					}));
				}
				return {
					message: 'New User Validated',
				};
			},
		],
		register: [
			'verification',
			async () => {
				const { body } = req;
				body.passwordHash = await bcrypt.hash(body.password, 10);
				delete body.password;

				const user = new User(body);
				const res = await user.save();

				if (res) {
					const token = jwt.sign(
						{ _id: res._id, email: res.email },
						process.env.TOKEN_KEY,
						{ expiresIn: '2h' },
					);
					const user = await User.findOneAndUpdate({ _id: res._id }, { token });
					return { message: 'New user registered', user };
				}
				throw new Error(JSON.stringify({
					errorkey: 'register',
					body: {
						status: 500,
						data: {
							message: 'Internal Server Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'register'));
};

module.exports = { schema, request };
