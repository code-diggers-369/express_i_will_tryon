const async = require('async');
const { Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleResponse = require('../../helpers/handleResponse');

// schemas
const Customer = require('../../schemas/Customer');

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

				const customer = await Customer.findOne({
					email,
				});

				if (customer && (await bcrypt.compare(password, customer.passwordHash))) {
					// Create token
					const token = jwt.sign(
						{ _id: customer._id, email: customer.email },
						process.env.TOKEN_KEY,
						{ expiresIn: '2h' },
					);

					// save user token
					customer.token = token;
					customer.save();

					// Admin
					return {
						message: 'Customer Authenticated',
						customer,
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'login',
					body: {
						status: 400,
						data: {
							message: 'Invalid Customer Credentials',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'login'));
};

module.exports = { schema, request };
