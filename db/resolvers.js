const userController = require('../controlles/User');
const followController = require('../controlles/Follow');
const friendController = require('../controlles/Friend');
const publicationController = require('../controlles/Publication');
const commentController = require('../controlles/Comment');
const likeController = require('../controlles/Like');
const resolvers = {
	Query: {
		//User
		getUser: (_, { id, email, uidFirebase }) => userController.getUser(id, email, uidFirebase),
		search: (_, { search }) => userController.search(search),
		isUserFirebase: (_, { uidFirebase }) => userController.isUserFirebase(uidFirebase),
		getUserConnect: (_, { connected }) => userController.getUserConnect(connected),
		//Follow
		isFollow: (_, { id }, ctx) => followController.isFollow(id, ctx),
		getFollowers: (_, { id }) => followController.getFollowers(id),
		//friend
		isFriend: (_, { id }, ctx) => friendController.isFriend(id, ctx),
		getFriends: (_, { id }) => friendController.getFriends(id),
		getNotFriends: (_, {}, ctx) => friendController.getNotFriends(ctx),
		//Publication
		getPublications: (_, { id }) => publicationController.getPublications(id),
		getPublicationsFollersFriends: (_, {}, ctx) => publicationController.getPublicationsFollersFriends(ctx),
		//Comment
		getComments: (_, { idPublication }) => commentController.getComments(idPublication),
		countComments: (_, { idPublication }) => commentController.countComments(idPublication),
		//Like
		isLike: (_, { idPublication }, ctx) => likeController.isLike(idPublication, ctx),
		countLikes: (_, { idPublication }) => likeController.countLikes(idPublication)
	},
	Mutation: {
		//User
		newUser: async (_, { input }) => userController.newUser(input),
		authenticateUser: async (_, { input }) => userController.authenticateUser(input),
		connectedUser: async (_, { connected }, ctx) => userController.connectedUser(connected, ctx),
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
		publish: (_, { file, comments }, ctx) => publicationController.publish(file, comments, ctx),
		publishMovil: (_, { file, comments }, ctx) => publicationController.publishMovil(file, comments, ctx),
		deletePublish: (_, { id }, ctx) => publicationController.deletePublish(id, ctx),
		//Commnet
		addComment: (_, { input }, ctx) => commentController.addComment(input, ctx),
		//Like
		addLike: (_, { idPublication }, ctx) => likeController.addLike(idPublication, ctx),
		deleteLike: (_, { idPublication }, ctx) => likeController.deleteLike(idPublication, ctx)
	}
};

module.exports = resolvers;
