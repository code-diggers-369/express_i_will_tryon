const { Schema, model } = require('mongoose');

const variantSchema = new Schema({
	productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
	quantity: { type: Number, default: 0, required: true },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Variant', variantSchema);
