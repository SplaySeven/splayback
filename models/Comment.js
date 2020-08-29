const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
	idPublication: {
		type: mongoose.Schema.Types.ObjectId,
		requiere: true,
		ref: 'Publication'
	},
	idUser: {
		type: mongoose.Schema.Types.ObjectId,
		requiere: true,
		ref: 'User'
	},
	comment: {
		type: String,
		trim: true,
		requiere: true
	},
	createAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Comment', CommentSchema);
