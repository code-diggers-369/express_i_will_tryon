const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Supplier', supplierSchema);
