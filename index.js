import express from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config({ path: '.env' });
//graphql
import { ApolloServer } from 'apollo-server-express';
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

//Conectar a la base de datos;

conectarDB();

const app = express();
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

server.applyMiddleware({ app });
app.listen({ port: process.env.PORT || 4000 }, () =>
	console.log(`El Servidor ApolloServer esta corriendo http://localhost:4000${server.graphqlPath} `)
);
