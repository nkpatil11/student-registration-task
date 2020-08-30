const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const common = require('../common/common');

// Define collection and schema for user

let UserSchema = new Schema({
	name: String,
	email: { type: String, lowercase: true },
	contact: String,
	hashedPassword: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

/**
 * Virtuals
 */
UserSchema.virtual('password')
	.set(function (password) {
		this._password = password;
		this.hashedPassword = common.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

/**
 * Validations
 */

// Validate empty email
UserSchema.path('email').validate(function (email) {
	return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('hashedPassword').validate(function (hashedPassword) {
	return hashedPassword.length;
}, 'Password cannot be blank');

var validatePresenceOf = function (value) {
	return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
	if (!this.isNew) return next();
	if (!validatePresenceOf(this.hashedPassword)) {
		next(new Error('Invalid password'));
	} else {
		next();
	}
});

module.exports = mongoose.model('User', UserSchema);
