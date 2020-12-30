const Like = require('../models/Like.js');

function addLike(idPublication, ctx) {
	try {
		const like = new Like({
			idPublication: idPublication,
			idUser: ctx.usuarioActual.id
		});
		like.save();
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function deleteLike(idPublication, ctx) {
	try {
		await Like.findOneAndDelete({ idPublication }).where({
			idUser: ctx.usuarioActual.id
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function isLike(idPublication, ctx) {
	try {
		const result = await Like.findOne({ idPublication }).where({
			idUser: ctx.usuarioActual.id
		});
		//if (!result) throw new Error('Like no encontrado');
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function countLikes(idPublication) {
	try {
		const result = await Like.countDocuments({ idPublication });
		return result;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	addLike,
	deleteLike,
	isLike,
	countLikes
};
