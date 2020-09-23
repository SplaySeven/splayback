<<<<<<< HEAD
=======
//import mongoose from 'mongoose';
>>>>>>> 564b7c3bc72e2b6e9b8d361f1e722fef8eab1153
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		});
		console.log('##################################');
		console.log('BD Conectada Cluster Atlas');
	} catch (error) {
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		console.log('Hubo un error');
		console.log(error);
		process.exit(1); //detener la app
	}
};

module.exports = conectarDB;
