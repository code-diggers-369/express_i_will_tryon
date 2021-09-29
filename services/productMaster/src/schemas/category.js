const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	slug: { type: String, required: true },
	parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Category', categorySchema);
