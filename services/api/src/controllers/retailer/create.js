const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		companyId: Joi.string()
			.required(),
		users: Joi.array()
			.items(Joi.string()),
	}),
};

const request = async (req, res) => {
	async.auto({
		companyVerification: [
			async () => {
				const { companyId } = req.body;
				const resp = await requester.company.get(`/company/${companyId}`, { headers: { authorization: req.headers.authorization } });
				if (resp.status === 200) {
					const { retailerId } = resp.data.company;
					if (retailerId) {
						throw new Error(JSON.stringify({
							errorkey: 'companyVerification',
							body: { status: 409, data: { message: 'Company Already Registerd as Retailer' } },
						}));
					}
					return { message: 'Company Verified' };
				}
				throw new Error(JSON.stringify({
					errorkey: 'companyVerification',
					body: {
						status: 404,
						data: { message: 'Invalid Primary User' },
					},
				}));
			},
		],
		create: [
			'companyVerification',
			async () => {
				const { users } = req.body;

				const resp = await requester.company.post(
					'/retailer/create',
					{ users },
					{ headers: req.headers },
				);

				if (resp.status === 200) { return resp.data; }

				throw new Error(JSON.stringify({
					errorkey: 'create',
					body: {
						status: 400,
						data: { message: 'Retailer Create' },
					},
				}));
			},
		],
		addIdToCompany: [
			'create',
			async (results) => {
				const { companyId } = req.body;
				const { _id: retailerId } = results.create.company;
				const resp = await requester.company.put(`/company/edit/${companyId}`, { retailerId }, { headers: {} });
				if (resp.status === 200) {
					return { message: 'Retailer Id Added to company' };
				}
				throw new Error(JSON.stringify({
					errorkey: 'addIdToCompany',
					body: {
						status: 400,
						data: { message: 'Retailer Id Not Added' },
					},
				}));
			},
		],
	}, handleResponse(req, res, 'create'));
};

module.exports = { schema, request };
