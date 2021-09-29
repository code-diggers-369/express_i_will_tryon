const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Category = require('../../schemas/category');

const schema = {
	body: Joi.object({
		name: Joi.string()
			.required(),
		description: Joi.string()
			.required(),
		slug: Joi.string()
			.required(),
		parentCategory: Joi.string(),
	}),
};

const request = async (req, res) => {
	async.auto({
		create: [
			async () => {
				const { body } = req;
				const category = new Category(body);

				const res = await category.save();

				if (res) {
					return {
						message: 'New Category Created',
						category: res,
					};
				}

				throw new Error(JSON.stringify({
					errorKey: 'create',
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
