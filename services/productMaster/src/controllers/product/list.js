const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Product = require('../../schemas/product');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		list: [
			async () => {
				const {
					pagination, page, limit, inStock, approved, published, priceFrom, priceTo, supplierId,
				} = req.query;

				const query = {};
				let results = [];

				if (inStock !== undefined) { if (inStock) { query.quantity = { $gt: 0 }; } else { query.quantity = { $lte: 0 }; } }
				if (approved !== undefined) { query.approved = approved; }
				if (published !== undefined) { query.published = published; }
				if (priceFrom) { query.price = { $gte: priceFrom }; }
				if (priceTo) { query.price = { $lt: priceTo }; }
				if (supplierId) { query.supplierId = supplierId; }

				if (pagination) {
					// eslint-disable-next-line radix
					results = await Product.find(query).skip((parseInt(page) - 1) * limit).limit(parseInt(limit));
				} else {
					results = await Product.find(query);
				}

				return {
					products: results,
				};
			},
		],
	}, handleResponse(req, res, 'list'));
};

module.exports = { schema, request };
