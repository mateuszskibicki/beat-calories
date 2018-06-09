const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DietSchema = new Schema({
	userID: {
		type: String,
		required: true
	},
	userNickname: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	kcal: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Diet = mongoose.model('diets', DietSchema);
