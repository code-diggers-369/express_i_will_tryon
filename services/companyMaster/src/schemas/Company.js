const { Schema, model } = require('mongoose');

const companySchema = new Schema({
	name: { type: String, unique: true, required: true },
	gstNumber: { type: String, unique: true, required: true },
	panNumber: { type: String, unique: true, required: true },
	primaryUser: { type: Schema.Types.ObjectId, required: true },
	resellerId: { type: Schema.Types.ObjectId, ref: 'Reseller' },
	supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
	retailerId: { type: Schema.Types.ObjectId, ref: 'Retailer' },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Company', companySchema);
