const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

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

				const resp = await requester.product.put(`/attribute/edit/${attributeId}`, body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'edit',
					body: {
						status: 409,
						data: {
							message: 'Attribute Edit Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'edit'));
};

module.exports = { schema, request };
