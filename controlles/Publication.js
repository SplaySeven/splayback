const Publication = require('../models/Publication');
const Follow = require('../models/Follow');
const Friend = require('../models/Friend');
const awsUploadImage = require('../utils/aws-upload-image');
const { v4: uuidv4 } = require('uuid');

async function publish(file, comments, ctx) {
	const { id } = ctx.usuarioActual;
	const { createReadStream, mimetype } = await file;
	const extension = mimetype.split('/')[1];
	const fileName = `publication/${uuidv4()}.${extension}`;
	const fileData = createReadStream();

	try {
		const result = await awsUploadImage(fileData, fileName);

		const publication = new Publication({
			idUser: id,
			file: result,
			typeFile: mimetype.split('/')[0],
			createAt: Date.now(),
			comments: comments
		});
		publication.save();
		return {
			status: true,
			urlFile: result
		};
	} catch (error) {
		return {
			status: null,
			urlFile: ''
		};
	}
}
//Estre proceso es para ejecutarlo en moviles
async function publishMovil(file, comments, ctx) {
	const { id } = ctx.usuarioActual;
	const { amazon, type } = await file;

	try {
		const publicationMovil = new Publication({
			idUser: id,
			file: amazon,
			typeFile: type.split('/')[0],
			createAt: Date.now(),
			comments: comments
		});
		publicationMovil.save();
		return {
			status: true,
			urlFile: result
		};
	} catch (error) {
		return {
			status: null,
			urlFile: ''
		};
	}
}

async function getPublications(id) {
	if (!id) throw new Error('Usuario no encontrado');
	const publications = await Publication.find().where({ idUser: id }).where({ state: 'S' }).sort({ createAt: -1 });

	return publications;
}
async function getPublicationsFollersFriends(ctx) {
	const followeds = await Follow.find({ idUser: ctx.usuarioActual.id }).populate('follow');
	const friends = await Friend.find({ idUser: ctx.usuarioActual.id }).populate('friend');
	const followedsList = [];
	for await (const data of followeds) {
		followedsList.push(data.follow);
	}

	const friendsList = [];
	for await (const data of friends) {
		friendsList.push(data.friend);
	}

	const publicationsList = [];
	for await (const data of followedsList) {
		const publications = await Publication.find()
			.where({ idUser: data._id })
			.where({ state: 'S' })
			.sort({ createAt: -1 })
			.populate('idUser')
			.limit(5);
		publicationsList.push(...publications);
	}
	//const publicationsList2 = [];
	for await (const data of friendsList) {
		const publications2 = await Publication.find()
			.where({ idUser: data._id })
			.where({ state: 'S' })
			.sort({ createAt: -1 })
			.populate('idUser')
			.limit(5);
		publicationsList.push(...publications2);
	}

	// Mis Publicaciones
	const Mypublications = await Publication.find()
		.where({ idUser: ctx.usuarioActual.id })
		.sort({ createAt: -1 })
		.where({ state: 'S' })
		.populate('idUser')
		.limit(5);

	publicationsList.push(...Mypublications);

	const result = publicationsList.sort((a, b) => {
		return new Date(b.createAt) - new Date(a.createAt);
	});
	return result;
}
async function deletePublish(id, ctx) {
	try {
		await Publication.findByIdAndUpdate(id, { state: 'N' }).where({ idUser: ctx.usuarioActual.id });
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

module.exports = {
	publish,
	publishMovil,
	getPublications,
	getPublicationsFollersFriends,
	deletePublish
};
