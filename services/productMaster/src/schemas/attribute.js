const { Schema, model } = require('mongoose');

const attributeSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Attribute', attributeSchema);
