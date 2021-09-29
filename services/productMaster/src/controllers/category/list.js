const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Category = require('../../schemas/category');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		list: [
			async () => {
				const {
					pagination, page, limit, onlyParent, parentCategory,
				} = req.query;

				let query = {};
				let results = [];

				if (onlyParent) { query = { parentCategory: { $exists: false } }; }
				if (parentCategory) { query = { parentCategory }; }

				if (pagination) {
					// eslint-disable-next-line radix
					results = await Category.find(query).skip((parseInt(page) - 1) * limit).limit(parseInt(limit));
				} else {
					results = await Category.find(query);
				}

				return {
					categories: results,
				};
			},
		],
	}, handleResponse(req, res, 'list'));
};

module.exports = { schema, request };
