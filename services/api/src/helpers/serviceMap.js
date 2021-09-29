module.exports = {
	user: {
		baseURL: `http://${process.env.USER_MASTER_SERVICE || 'usermaster:3000'}`,
		timeout: 1000,
		header: {},
	},
	company: {
		baseURL: `http://${process.env.COMPANY_MASTER_SERVICE || 'companymaster:3000'}`,
		timeout: 1000,
		header: {},
	},
	product: {
		baseURL: `http://${process.env.PRODUCT_MASTER_SERVICE || 'productmaster:3000'}`,
		timeout: 1000,
		header: {},
	},
};
