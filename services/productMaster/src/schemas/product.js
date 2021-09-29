const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	shortDescriptions: { type: String },
	slug: { type: String, required: true },
	attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
	variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
	categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	quantity: { type: Number, default: 0, required: true },
	approved: { type: Boolean, default: false },
	published: { type: Boolean, default: false },
	price: { type: Number, required: true },
	discountedPrice: { type: Number },
	supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Product', productSchema);
