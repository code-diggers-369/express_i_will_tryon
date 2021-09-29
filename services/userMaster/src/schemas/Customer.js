const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	phone: { type: Number, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	token: { type: String },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('Customer', customerSchema);
