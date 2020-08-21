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
		picture:String
		active: String
		confirmed: String
		created: String
		type: String
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

	input UserInput {
		email: String!
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
	}

	input authenticateInput {
		email: String!
		password: String!
	}

	type Query {
		#User
		getUser(id: ID, email: String): User
		search(search: String): [User]
		#Follow
		isFollow(id: ID!): Boolean
		getFollowers(id: ID!): [User]
	}

	type Mutation {
		#User
		newUser(input: UserInput): User
		authenticateUser(input: authenticateInput): Token
		updateAvatar(file: Upload): UpdateAvatar
		updatePicture(file:Upload):UpdatePicture
		#Follow
		follow(id: ID!): Boolean
		unFollow(id: ID!): Boolean
		#Publication
		publish(file: Upload): Publish
	}
`;

module.exports = typeDefs;
