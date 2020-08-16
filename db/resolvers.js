const userController = require('../controlles/User');
const User = require('../models/User');
const resolvers = {
	Query: {
		getUser: (_, { id, email }) => userController.getUser(id, email),
		search: (_, { search }) => userController.search(search)
	},
	Mutation: {
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx)
	}
};

module.exports = resolvers;
