const userController = require('../controlles/User');
const followController = require('../controlles/Follow');
const friendController = require('../controlles/Friend');
const publicationController = require('../controlles/Publication');

const resolvers = {
	Query: {
		//User
		getUser: (_, { id, email }) => userController.getUser(id, email),
		search: (_, { search }) => userController.search(search),
		//Follow
		isFollow: (_, { id }, ctx) => followController.isFollow(id, ctx),
		getFollowers: (_, { id }) => followController.getFollowers(id),
		//friend
		isFriend: (_, { id }, ctx) => friendController.isFriend(id, ctx),
		getFriends: (_, { id }) => friendController.getFriends(id)
	},
	Mutation: {
		//User
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
		deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
		updatePicture: (_, { file }, ctx) => userController.updatePicture(file, ctx),
		deletePicture: (_, {}, ctx) => userController.deletePicture(ctx),
		//Follow
		follow: (_, { id }, ctx) => followController.follow(id, ctx),
		unFollow: (_, { id }, ctx) => followController.unFollow(id, ctx),
		//Friend
		friend: (_, { id }, ctx) => friendController.friend(id, ctx),
		unFriend: (_, { id }, ctx) => friendController.unFriend(id, ctx),
		//Publication
		publish: (_, { file }, ctx) => publicationController.publish(file, ctx)
	}
};

module.exports = resolvers;
