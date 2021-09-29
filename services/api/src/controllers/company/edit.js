const async = require('async');
const { Joi } = require('celebrate');
const handleResponse = require('../../helpers/handleResponse');

const requester = require('../../helpers/axios');

const schema = {
	body: Joi.object({
		name: Joi.string(),
		gstNumber: Joi.string(),
		panNumber: Joi.string(),
		primaryUser: Joi.string(),
		resellerId: Joi.string(),
		supplierId: Joi.string(),
		retailerId: Joi.string(),
	}),
};

const request = async (req, res) => {
	async.auto({
		resellerVerification: [
			async () => {
				const { resellerId } = req.body;
				if (resellerId) {
					const resp = await requester.company.get(`/reseller/${resellerId}`);
					if (resp.status === 200) {
						return {
							message: 'Reseller Verified',
						};
					}
					throw new Error(JSON.stringify({
						errorkey: 'resellerVerification',
						body: {
							status: 404,
							data: {
								message: 'Invalid Reseller Id',
							},
						},
					}));
				}
				return {
					message: 'No reseller ID',
				};
			},
		],
		retailerVerification: [
			async () => {
				const { retailerId } = req.body;
				if (retailerId) {
					const resp = await requester.company.get(`/retailer/${retailerId}`);
					if (resp.status === 200) {
						return {
							message: 'Retailer Verified',
						};
					}
					throw new Error(JSON.stringify({
						errorkey: 'retailerVerification',
						body: {
							status: 404,
							data: {
								message: 'Invalid Retailer Id',
							},
						},
					}));
				}
				return {
					message: 'No reseller ID',
				};
			},
		],
		supplierVerification: [
			async () => {
				const { supplierId } = req.body;
				if (supplierId) {
					const resp = await requester.company.get(`/supplier/${supplierId}`);
					if (resp.status === 200) {
						return {
							message: 'Supplier Verified',
						};
					}
					throw new Error(JSON.stringify({
						errorkey: 'supplierVerification',
						body: {
							status: 404,
							data: {
								message: 'Invalid Supplier Id',
							},
						},
					}));
				}
				return {
					message: 'No Supplier ID',
				};
			},
		],
		edit: [
			'resellerVerification',
			'retailerVerification',
			'supplierVerification',
			async () => {
				const { body } = req;
				const { companyId } = req.params;

				const resp = await requester.company.put(`/company/edit/${companyId}`, body, { headers: req.headers });

				if (resp.status === 200) {
					return resp.data;
				}

				throw new Error(JSON.stringify({
					errorkey: 'edit',
					body: {
						status: 409,
						data: {
							message: 'Company Edit Error',
						},
					},
				}));
			},
		],
	}, handleResponse(req, res, 'edit'));
};

module.exports = { schema, request };
