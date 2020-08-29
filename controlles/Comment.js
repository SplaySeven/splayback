const Comment = require('../models/Comment');

function addComment(input, ctx) {
	try {
		const comment = new Comment({
			idPublication: input.idPublication,
			idUser: ctx.usuarioActual.id,
			comment: input.comment
		});
		comment.save();
		return comment;
	} catch (error) {
		console.log(error);
	}
}
async function getComments(idPublication) {
	const result = await Comment.find({ idPublication }).populate('idUser').sort({ createAt: -1 });

	return result;
}

module.exports = {
	addComment,
	getComments
};
