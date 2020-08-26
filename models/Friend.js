const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = Schema({
	idUser: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: 'User'
	},
	friend: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: 'User'
	},
	createAt: {
		type: Date,
		default: Date.now()
	}
});
module.exports = mongoose.model('Friend', FriendSchema);
