const userController = require('../controlles/User');
const followController = require('../controlles/Follow');
const publicationController = require('../controlles/Publication');

const resolvers = {
	Query: {
		//User
		getUser: (_, { id, email }) => userController.getUser(id, email),
		search: (_, { search }) => userController.search(search),
		//Follow
		isFollow: (_, { email }, ctx) => followController.isFollow(email, ctx),
		getFollowers: (_, { email }) => followController.getFollowers(email)
	},
	Mutation: {
		//User
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
		//Follow
		follow: (_, { email }, ctx) => followController.follow(email, ctx),
		unFollow: (_, { email }, ctx) => followController.unFollow(email, ctx),
		//Publication
		publish: (_, { file }, ctx) => publicationController.publish(file, ctx)
	}
};

module.exports = resolvers;
