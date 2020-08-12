const userController = require('../controlles/User');
const User = require('../models/User');
const resolvers = {
	Query: {
		obtenerUsuario: (_, args, { usuarioActual }) => {
			if (!usuarioActual) {
				return null;
			}
			console.log(usuarioActual);
			//Obtner el usuario Actual del request del jwt veriticado
			const user = User.finOne({ email: usuarioActual.email });
			return user;
		}
	},
	Mutation: {
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		updateAvatar: (_, { file }) => userController.updateAvatar(file)
	}
};

module.exports = resolvers;
