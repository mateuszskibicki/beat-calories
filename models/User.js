const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: 'http://riverfoxrealty.com/wp-content/uploads/2018/02/User-Default.jpg'
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'posts'
	}],
	diets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'diets'
	}]
});

module.exports = User = mongoose.model('users', UserSchema);
