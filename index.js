const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

//Conectar a la base de datos;

conectarDB();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers['authorization'] || '';
		if (token) {
			try {
				//Verificamos el token del front end (cliente)
				const usuarioActual = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);

				//agregamos el usuario actual al request
				req.usuarioActual = usuarioActual;

				return { usuarioActual };
			} catch (error) {
				console.log('Hubo un error');
				console.log(error);
			}
		}
	}
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`El Servidor ApolloServer esta corriendo ${url}`);
});
