const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		name: Joi.string()
			.required(),
		gstNumber: Joi.string()
			.required(),
		panNumber: Joi.string()
			.required(),
		primaryUser: Joi.string()
			.required(),
	}),
};

const request = async (req, res) => {
	async.auto({
		userVerification: [
			async () => {
				const { primaryUser } = req.body;
				const resp = await requester.user.get(`/user/${primaryUser}`, { headers: req.headers });
				if (resp.status === 200) {
					return {
						message: 'User Verified',
					};
				}
				throw new Error(JSON.stringify({
					errorkey: 'userVerification',
					body: {
						status: 404,
						data: {
							message: 'Invalid Primary User',
						},
					},
				}));
			},
		],
		create: [
			'userVerification',
			async () => {
				const {
					name, gstNumber, panNumber, primaryUser,
				} = req.body;

				const resp = await requester.company.post('/company/create', {
					name, gstNumber, panNumber, primaryUser,
				}, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 400,
						data: {
							message: 'Company Create',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
