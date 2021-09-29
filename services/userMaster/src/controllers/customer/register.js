const async = require('async');
const { Joi } = require('celebrate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleResponse = require('../../helpers/handleResponse');

// schemas
const Customer = require('../../schemas/Customer');

const schema = {
	body: Joi.object({
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
				const customerCheck = await Customer.findOne({
					$or: [
						{ email: body.email },
						{ phone: body.phone },
					],
				});
				if (customerCheck) {
					throw new Error(JSON.stringify({
						errorkey: 'verification',
						body: {
							status: 409,
							data: {
								message: 'Customer User Already Exists',
							},
						},
					}));
				}
				return {
					message: 'New Customer Validated',
				};
			},
		],
		register: [
			'verification',
			async () => {
				const { body } = req;
				body.passwordHash = await bcrypt.hash(body.password, 10);
				delete body.password;

				const customer = new Customer(body);
				const res = await customer.save();

				if (res) {
					const token = jwt.sign(
						{ _id: res._id, email: res.email },
						process.env.TOKEN_KEY,
						{ expiresIn: '2h' },
					);
					const customer = await Customer.findOneAndUpdate({ _id: res._id }, { token });
					return { message: 'New custoomer registered', customer };
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
