//Aqui pondremos los seguidores de cada Usuarios
const Follow = require('../models/Follow');
const User = require('../models/User');

async function follow(email, ctx) {
	const userFound = await User.findOne({ email });
	if (!userFound) throw new Error('Usuario no encontrado');

	try {
		const follow = new Follow({
			idUser: ctx.user.id,
			follow: userFound._id
		});
	} catch (error) {
		console.log(error);
		return false;
	}
}
async function isFollow(email, ctx) {
	const userFound = await User.findOne({ email });
	if (!userFound) throw new Error('Usuario no encontado');
	const follow = await Follow.find({ idUser: ctx.id }).where('follow').equals(userFound._id);

	if (follow.length > 0) {
		return true;
	}
	return false;
}
async function unFollow(email, ctx) {
	const userFound = await User.findOne({ email });
	const follow = await Follow.deleteOne({ idUser: ctx.user.id }).where('follow').equals(userFound._id);
	if (follow.deletedCount > 0) {
		return true;
	}
	return false;
}
async function getFollowers(email) {
	const user = await User.findOne({ email });
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
