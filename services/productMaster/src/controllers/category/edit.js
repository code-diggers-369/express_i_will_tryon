const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Category = require('../../schemas/category');

const schema = {
	body: Joi.object({
		name: Joi.string(),
		description: Joi.string(),
		slug: Joi.string(),
		parentCategory: Joi.string(),
	}),
};

const request = async (req, res) => {
	async.auto({
		edit: [
			async () => {
				const { body } = req;
				const { categoryId } = req.params;

				const res = await Category.findOneAndUpdate({
					_id: categoryId,
				}, body, { returnOriginal: false });

				if (res) {
					return { message: 'Category Updated', prooduct: res };
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
