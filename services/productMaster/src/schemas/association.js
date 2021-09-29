const { Schema, model } = require('mongoose');

const associationSchema = new Schema({
	retailerId: { type: Schema.Types.ObjectId, ref: 'Retailer' },
	resellerId: { type: Schema.Types.ObjectId, ref: 'Reseller' },
	productId: { type: Schema.Types.ObjectId, ref: 'Product' },
	override: {
		name: { type: String },
		description: { type: String },
		shortDescriptions: { type: String },
		attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
		variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
		categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
		approved: { type: Boolean, default: false },
		published: { type: Boolean, default: false },
		price: { type: Number },
		discountedPrice: { type: Number },
	},
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Association', associationSchema);
