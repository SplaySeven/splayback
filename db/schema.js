const { gql } = require('apollo-server-express');

//Schema

const typeDefs = gql`
	type User {
		id: ID
		email: String
		phone: String
		name: String
		lastname: String
		gender: String
		birthdayDay: String
		birthdayMonth: String
		birthdayYear: String
		country: String
		city: String
		latitude: Float
		longitude: Float
		avatar: String
		picture: String
		active: String
		confirmed: String
		created: String
		type: String
		uidFirebase: String
		connected: String
	}

	type Token {
		token: String
	}

	type UpdateAvatar {
		status: Boolean
		urlAvatar: String
	}

	type UpdatePicture {
		status: Boolean
		urlPicture: String
	}

	type Publish {
		status: Boolean
		urlFile: String
	}

	type Publication {
		id: ID
		idUser: String
		file: String
		typeFile: String
		createAt: String
		comments: String
	}

	type Comment {
		idPublication: ID
		idUser: User
		comment: String
		createAt: String
	}

	type FeedFriendPublication {
		id: ID
		idUser: User
		file: String
		typeFile: String
		createAt: String
		comments: String
	}

	input UserInput {
		email: String
		phone: String
		password: String!
		name: String!
		lastname: String
		gender: String
		birthdayDay: String
		birthdayMonth: String
		birthdayYear: String
		country: String
		city: String
		latitude: Float
		longitude: Float
		type: String
		uidFirebase: String
		connected: String
	}

	input authenticateInput {
		uidFirebase: String!
		password: String!
	}

	input commentInput {
		idPublication: ID
		comment: String
	}

	type Query {
		#User
		getUser(id: ID, email: String, uidFirebase: String): User
		getUserConnect(connected: String): [User]
		search(search: String): [User]
		isUserFirebase(uidFirebase: String!): Boolean
		#Follow
		isFollow(id: ID!): Boolean
		getFollowers(id: ID!): [User]
		#Friend
		isFriend(id: ID!): Boolean
		getFriends(id: ID!): [User]
		getNotFriends: [User]
		#Publication
		getPublications(id: ID!): [Publication]
		getPublicationsFollersFriends: [FeedFriendPublication]
		#Comment
		getComments(idPublication: ID!): [Comment]
		countComments(idPublication: ID!): Int
		#Like
		isLike(idPublication: ID!): Boolean
		countLikes(idPublication: ID!): Int
	}

	type Mutation {
		#User
		newUser(input: UserInput): User
		authenticateUser(input: authenticateInput): Token
		connectedUser(connected: String): Boolean
		updateAvatar(file: Upload): UpdateAvatar
		deleteAvatar: Boolean
		updatePicture(file: Upload): UpdatePicture
		deletePicture: Boolean
		#Follow
		follow(id: ID!): Boolean
		unFollow(id: ID!): Boolean
		#Friend
		friend(id: ID!): Boolean
		unFriend(id: ID!): Boolean
		#Publication
		publish(file: Upload, comments: String): Publish
		#Comment
		addComment(input: commentInput): Comment
		#Like
		addLike(idPublication: ID!): Boolean
		deleteLike(idPublication: ID!): Boolean
	}
`;

module.exports = typeDefs;
