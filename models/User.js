const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true
	},
	phone: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	lastname: {
		type: String,
		trim: true,
		default: 'ND'
	},
	gender: {
		type: String,
		trim: true
	},
	birthdayDay: {
		type: String,
		default: '01'
	},
	birthdayMonth: {
		type: String,
		default: '01'
	},
	birthdayYear: {
		type: String,
		default: '1800'
	},
	country: {
		type: String
	},
	city: {
		type: String
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	avatar: {
		type: String,
		trim: true
	},
	picture: {
		type: String,
		trim: true
	},
	active: {
		type: String,
		default: 'N'
	},
	confirmed: {
		type: String,
		default: 'N'
	},
	created: {
		type: Date,
		default: Date.now()
	},
	type: {
		type: String
	},
	uidFirebase: {
		type: String,
		required: true
	},
	connected: {
		type: String,
		default: 'N'
	},
	dateConnect: {
		type: Date
	}
});

module.exports = mongoose.model('User', UserSchema);
