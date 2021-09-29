const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const Retailer = require('../../schemas/Retailer');

const schema = {
	body: Joi.object({}),
};

const request = async (req, res) => {
	async.auto({
		list: [
			async () => {
				const {
					pagination, page, limit,
				} = req.query;

				const query = {};
				let results = [];

				if (pagination) {
					// eslint-disable-next-line radix
					results = await Retailer.find(query).skip((parseInt(page) - 1) * limit).limit(parseInt(limit));
				} else {
					results = await Retailer.find(query);
				}

				return {
					retailers: results,
				};
			},
		],
	}, handleResponse(req, res, 'list'));
};

module.exports = { schema, request };
