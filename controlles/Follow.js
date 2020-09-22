//Aqui pondremos los seguidores de cada Usuarios
const Follow = require('../models/Follow');
const User = require('../models/User');

async function follow(id, ctx) {
	//Guardar el usuario logeao y al que sigo

	const userFound = await User.findById(id);
	if (!userFound) throw new Error('Usuario no encontrado');
	try {
		const follow = new Follow({
			idUser: ctx.usuarioActual.id,
			follow: userFound._id
		});
		follow.save();
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
async function isFollow(id, ctx) {
	//Saber si sigo a un usuario
	const userFound = await User.findById(id);
	if (!userFound) throw new Error('Usuario no encontado');
	const follow = await Follow.find({ idUser: ctx.usuarioActual.id }).where('follow').equals(userFound._id);

	if (follow.length > 0) {
		return true;
	}
	return false;
}
async function unFollow(id, ctx) {
	//Dejar de seguir a un usuario (borrar)
	const userFound = await User.findById(id);
	const follow = await Follow.deleteOne({ idUser: ctx.usuarioActual.id }).where('follow').equals(userFound._id);
	if (follow.deletedCount > 0) {
		return true;
	}
	return false;
}
async function getFollowers(id) {
	const user = await User.findById(id);
	const followers = await Follow.find({ follow: user._id }).populate('idUser');

	const followersList = [];
	for await (const data of followers) {
		followersList.push(data.idUser);
	}

	return followersList;
}

module.exports = {
	follow,
	isFollow,
	unFollow,
	getFollowers
};
