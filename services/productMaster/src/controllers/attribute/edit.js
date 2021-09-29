const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

// Schema
const Attribute = require('../../schemas/attribute');

const schema = {
	body: Joi.object({
		name: Joi.string(),
		description: Joi.string(),
	}),
};

const request = async (req, res) => {
	async.auto({
		edit: [
			async () => {
				const { body } = req;
				const { attributeId } = req.params;

				const res = await Attribute.findOneAndUpdate({
					_id: attributeId,
				}, body, { returnOriginal: false });

				if (res) {
					return { message: 'Attribute Updated', prooduct: res };
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
