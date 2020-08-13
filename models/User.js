import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
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
		trim: true
	},
	gender: {
		type: String,
		trim: true
	},
	birthdayDay: {
		type: String
	},
	birthdayMonth: {
		type: String
	},
	birthdayYear: {
		type: String
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
	}
});

module.exports = mongoose.model('User', UserSchema);
