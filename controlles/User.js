const bcryptjs = require('bcryptjs');
//import bcrypt from 'bcrypt';
<<<<<<< HEAD
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
=======
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

>>>>>>> 564b7c3bc72e2b6e9b8d361f1e722fef8eab1153
const User = require('../models/User');
require('dotenv').config({ path: 'variables.env' });
const awsUploadImage = require('../utils/aws-upload-image');

async function isUserFirebase(uidFirebase) {
	//Saber si ya fue ingresado desde firebase
	const userFound = await User.findOne({ uidFirebase });
	if (!userFound) {
		return false;
	}
	return true;
}

async function newUser(input) {
	const newUser = input;
	newUser.email = newUser.email.toLowerCase();

	const { email, password } = newUser;
	//Revisar si el Correo ya existe en la base de datos
	/*
	const existeEmail = await User.findOne({ email });
	if (existeEmail) {
		throw new Error('El Correo ya esta registrado');
	}
*/
	//Encriptar su password
	const salt = await bcryptjs.genSaltSync(10);
	newUser.password = await bcryptjs.hash(password, salt);
	try {
		//Guardar en la base de Datos
		const user = new User(newUser);
		user.save(); //guardado
		return user;
	} catch (error) {
		console.log(error);
	}
}

const crearToken = (user, secreta, expiresIn) => {
	const { id, email, name, lastname } = user;
	return jwt.sign({ id, email, name, lastname }, secreta, { expiresIn });
};

async function authenticateUser(input) {
	//Si el usuario existe
	const { uidFirebase, password } = input;
	const existeUsuario = await User.findOne({ uidFirebase });
	if (!existeUsuario) {
		throw new Error('El Usuario no existe');
	}
	// Revisar si el password es correcto
	const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
	if (!passwordCorrecto) {
		throw new Error('El Password es Incorrecto');
	}

	//Crear el token
	return {
		token: crearToken(existeUsuario, process.env.SECRETA, '7d')
	};
	// se crea ka  funcion para guardar la foto en aws y el id en el base de datos
}
async function connectedUser(connected, ctx) {
	const { id } = ctx.usuarioActual;
	try {
		await User.findByIdAndUpdate(id, { connected: connected });
		return true;
	} catch (error) {
		return false;
	}
}
async function getUserConnect(connected) {
	const users = await User.find({ connected });
	return users;
}
async function updateAvatar(file, ctx) {
	const { id } = ctx.usuarioActual;
	const { createReadStream, mimetype } = await file;
	const extension = mimetype.split('/')[1];
	const imageName = `avatar/${uuidv4()}.${extension}`;
	const fileData = createReadStream();
	try {
		const result = await awsUploadImage(fileData, imageName);

		await User.findByIdAndUpdate(id, { avatar: result });
		return {
			status: true,
			urlAvatar: result
		};
	} catch (error) {
		return {
			status: false,
			urlAvatar: null
		};
	}
}
// Funcion que actualiza la foto de perfil
async function updatePicture(file, ctx) {
	const { id } = ctx.usuarioActual;

	const { createReadStream, mimetype } = await file;
	const extension = mimetype.split('/')[1];
	const imageName = `portada/${uuidv4()}.${extension}`;
	const fileData = createReadStream();
	try {
		const result = await awsUploadImage(fileData, imageName);
<<<<<<< HEAD
=======
		console.log(result);
>>>>>>> 564b7c3bc72e2b6e9b8d361f1e722fef8eab1153
		await User.findByIdAndUpdate(id, { picture: result });
		return {
			status: true,
			urlPicture: result
		};
	} catch (error) {
		return {
			status: false,
			urlPicture: null
		};
	}
}
async function getUser(id, email, uidFirebase) {
	let user = null;
	if (id) user = await User.findById(id);
	if (email) user = await User.findOne({ email });
	if (uidFirebase) user = await User.findOne({ uidFirebase });
	if (!user) throw new Error('El usuario no existe');
	return user;
}
async function search(search) {
	const users = await User.find({
		name: { $regex: search, $options: 'i' }
	});
	return users;
}
async function deleteAvatar(ctx) {
	const { id } = ctx.usuarioActual;
	try {
		await User.findByIdAndUpdate(id, { avatar: '' });
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
async function deletePicture(ctx) {
	const { id } = ctx.usuarioActual;
	try {
		await User.findByIdAndUpdate(id, { picture: '' });
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

<<<<<<< HEAD
module.exports = {
	newUser,
	authenticateUser,
	updateAvatar,
	getUser,
	search,
	updatePicture,
	deleteAvatar,
	deletePicture,
	isUserFirebase,
	connectedUser,
	getUserConnect
};
=======
module.exports = { newUser, authenticateUser, updateAvatar, getUser, search, updatePicture };
>>>>>>> 564b7c3bc72e2b6e9b8d361f1e722fef8eab1153
