const bcryptjs = require('bcryptjs');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = require('../models/User');
require('dotenv').config({ path: 'variables.env' });

async function newUser(input) {
	const newUser = input;
	newUser.email = newUser.email.toLowerCase();

	const { email, password } = newUser;
	//Revisar si el Correo ya existe en la base de datos
	const existeEmail = await User.findOne({ email });
	if (existeEmail) {
		throw new Error('El Correo ya esta registrado');
	}
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
	const { email, password } = input;
	const existeUsuario = await User.findOne({ email: email.toLowerCase() });
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
		token: crearToken(existeUsuario, process.env.SECRETA, '24h')
	};
	// se crea ka  funcion para guardar la foto en aws y el id en el base de datos
	//async function updateAvatar(file) {
	//	console.log(file);
	//	}
}
module.exports = { newUser, authenticateUser };
