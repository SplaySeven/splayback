const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicactionSchema = Schema({
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'User'
	},
	file: {
		type: String,
		trim: true,
		require: true
	},
	typeFile: {
		type: String,
		trim: true
	},
	createAt: {
		type: Date,
		default: Date.now()
	},
	comments: {
		type: String
	},
	state: {
		type: String,
		default: 'S'
	}
});
module.exports = mongoose.model('Publication', PublicactionSchema);
