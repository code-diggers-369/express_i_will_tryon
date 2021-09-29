const async = require('async');
const { Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleResponse = require('../../helpers/handleResponse');

// schemas
const Admin = require('../../schemas/Admin');

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

				const admin = await Admin.findOne({
					email,
				});

				if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
					// Create token
					const token = jwt.sign(
						{ _id: admin._id, email: admin.email },
						process.env.TOKEN_KEY,
						{ expiresIn: '2h' },
					);
					const adminToken = jwt.sign(
						{ _id: res._id, email: res.email },
						process.env.ADMIN_TOKEN_KEY,
						{ expiresIn: '2h' },
					);

					// save user token
					admin.token = token;
					admin.adminToken = adminToken;
					admin.save();

					// Admin
					return {
						message: 'admin Authenticated',
						admin,
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
