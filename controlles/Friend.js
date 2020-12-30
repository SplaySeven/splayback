const Friend = require('../models/Friend');
const User = require('../models/User');

//Funcion de seguir Amigo
async function friend(id, ctx) {
	const userFound = await User.findById(id);
	if (!userFound) throw new Error('Usuario no Encontrado');
	try {
		const friend = new Friend({
			idUser: ctx.usuarioActual.id,
			friend: userFound._id
		});
		friend.save();
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

//Funcion para saber si estoy siguiendo Amigo
async function isFriend(id, ctx) {
	const userFound = await User.findById(id);
	if (!userFound) throw new Error('Usuario no econtado');
	const friend = await Friend.find({ idUser: ctx.usuarioActual.id }).where('friend').equals(userFound.id);
	if (friend.length > 0) {
		return true;
	}
	return false;
}
//Funcion para dejarlo como amigo
async function unFriend(id, ctx) {
	const userFound = await User.findById(id);
	const friend = await Friend.deleteOne({ idUser: ctx.usuarioActual.id }).where('friend').equals(userFound._id);
	if (friend.deletedCount > 0) {
		return true;
	}
	return false;
}
//Funcion para ver todos mis amigos
async function getFriends(id) {
	const user = await User.findById(id);
	const friends = await Friend.find({ idUser: id }).populate('friend');
	const friendsList = [];
	for await (const data of friends) {
		friendsList.push(data.friend);
	}
	return friendsList.sort({ name: 1 });
}
//Funcion para ver los amigos que nos siguen
async function getFriendrs(id) {
	const user = await User.findById(id);
	const friends = await Friend.find({ friend: id }).populate('idUser');
	const friendsList = [];
	for await (const data of friends) {
		friendsList.push(data);
	}
	return friendsList;
}

async function getNotFriends(ctx) {
	const users = await User.find().where({ type: 'P' }).sort({ name: -1 });
	const arrayUsers = [];
	for await (const user of users) {
		const isFind = await Friend.findOne({ idUser: ctx.usuarioActual.id }).where('friend').equals(user._id);
		if (!isFind) {
			if (user._id.toString() !== ctx.usuarioActual.id.toString()) {
				arrayUsers.push(user);
			}
		}
	}
	return arrayUsers;
}

module.exports = {
	friend,
	isFriend,
	unFriend,
	getFriends,
	getFriendrs,
	getNotFriends
};
