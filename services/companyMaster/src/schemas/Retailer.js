const { Schema, model } = require('mongoose');

const retailerSchema = new Schema({
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Retailer', retailerSchema);
