const { Schema, model } = require('mongoose');

const UserSchema = Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			Select: false,
			require: true,
		},
		displayName: {
			type: String,
			unique: true,
			require: true,
		},
		name: {
			type: String,
			require: true,
		},
		lastname: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
		},
		singUpDate: {
			type: Date,
			default: Date.now(),
		},
		lastLogin: Date,
	},
	{ timestamps: true }
);

module.exports = model('users', UserSchema);
