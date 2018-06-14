const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// http://allrecipes.co.uk/recipes/cook-prep-method.aspx?o_is=TopNode_3_Method
// title kcal dishType cookingMethod cousines lifestyle preparationTime cookingTime
// short and long desc, price, photo ->> all required
// tags and ingradients nope
// Create Schema
const RecipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	kcal: {
		type: String,
		required: true
	},
	dishType: {
		type: String,
		required: true
	},
	cookingMethod : {
		type: String,
		required: true
	},
	cousines: {
		type: String,
		required: true
	},
	lifestyle: {
		type: String,
		required: true
	},
	preparationTime: {
		type: String,
		required: true
	},
	cookingTime : {
		type: String,
		required: true
	},
	shortDescription: {
		type: String,
		required: true
	},
	longDescription: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	// photo: {
	// 	type: String,
	// 	required: true
	// },
	tags: [{
		type: String
	}],
	ingradients: [{
		type: String
	}],
	likes: [{
		type: String
	}],
	date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	}
});

module.exports = Recipe = mongoose.model('recipes', RecipeSchema);
