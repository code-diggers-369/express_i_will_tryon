const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	firstName: { type: String },
	lastName: { type: String },
	phone: { type: Number, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	token: { type: String },
	// role: { type: String, required: true },
});

/**
 * Middlewear Hooks
 */

// Pre-hooks

// Post-hooks

module.exports = model('User', userSchema);
