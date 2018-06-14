const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');

// Post model
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');

// @route   GET api/recipes
// @desc    GET all recipies
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// find all and populate with user
		// return just id, avatar, name and nickname of user
		Recipe.find().populate('user')
			.then(recipes => {
				let allRecipes = []; // empty array
				recipes.map(recipe => { // map through array
					let recipeWithUser = {
						...recipe._doc,
						user: {
							_id: diet.user._id,
							avatar: diet.user.avatar,
							name: diet.user.name,
							nickname: diet.user.nickname
						}
					};
					allRecipes.unshift(recipeWithUser);
				});
				res.json(allRecipes);
			})
			.catch(e => res.json(e));
	});
  

// @route   POST api/recipes
// @desc    Add recipe
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// required: title*, kcal*, dishType*, cookingMethod*, cousines*, lifestyle*, 
		// preparationTime*, cookingTime*, shortDescription*, longDescription*, price*, photo
		// if tags* or ingradients* >> comma separated values >> array
		// default date
		let recipeFields = {};
		let recipeTags = [];
		let recipeIngradients = [];
		let errors = {};
	
		if(_.isEmpty(req.body.title)) {
			errors.title = 'Title is required.';
		} else if (
			req.body.title.trim().length < 5 || 
			req.body.title.trim().length > 50) 
		{
			errors.title = 'Title length between 5 and 50 characters.';
		}
	
		if(_.isEmpty(req.body.kcal)) {
			errors.kcal = 'Kalories are required.';
		}
	
		if(_.isEmpty(req.body.dishType)) {
			errors.dishType = 'Type of meal is required.';
		}
    
		if(_.isEmpty(req.body.cookingMethod)) {
			errors.cookingMethod = 'Cooking method is required.';
		}
    
		if(_.isEmpty(req.body.cousines)) {
			errors.cousines = 'Cousine is required.';
		}

		if(_.isEmpty(req.body.lifestyle)) {
			errors.lifestyle = 'Info about lifestyle is required, if you can\'t specify, choose mixed.';
		}

		if(_.isEmpty(req.body.preparationTime)) {
			errors.preparationTime = 'Preparation time is required.';
		}

		if(_.isEmpty(req.body.cookingTime)) {
			errors.cookingTime = 'Cooking time is required.';
		}

		if(_.isEmpty(req.body.price)) {
			errors.price = 'Price is required.';
		}

		if(_.isEmpty(req.body.shortDescription)) {
			errors.shortDescription = 'Short description is required, 10-200 characters. Define shortly what people can expect with this recipe';
		} else if (
			req.body.shortDescription.trim().length < 10 || 
			req.body.shortDescription.trim().length > 200 
		) {
			errors.shortDescription = 'Short description must be between 10 and 200 characters (letters, numbers, spaces).';
		}

		if(_.isEmpty(req.body.longDescription)) {
			errors.longDescription = 'Long description is required, 50-3000 characters. Explain how to prepare meal and what ingradients are needed.';
		} else if (
			req.body.longDescription.trim().length < 50 || 
			req.body.longDescription.trim().length > 3000 
		) {
			errors.longDescription = 'Long description must be between 50 and 3000 characters (letters, numbers, spaces).';
		}

		if(!_.isEmpty(req.body.tags)) {
			recipeTags = req.body.tags.trim().split(',');
			recipeTags = recipeTags.map(tag => {return tag.trim();});
		}

		if(!_.isEmpty(req.body.ingradients)) {
			recipeIngradients = req.body.ingradients.trim().split(',');
			recipeIngradients = recipeIngradients.map(ingradient => {return ingradient.trim();});
		}

		
	
		if(!_.isEmpty(errors)) {
			res.json(errors);
		} else {
			// create object with key value pairs
			// required
			recipeFields.title = req.body.title.trim();
			recipeFields.kcal = req.body.kcal;
			recipeFields.dishType = req.body.dishType;
			recipeFields.cookingMethod = req.body.cookingMethod;
			recipeFields.cousines = req.body.cousines;
			recipeFields.lifestyle = req.body.lifestyle;
			recipeFields.preparationTime = req.body.preparationTime;
			recipeFields.cookingTime = req.body.cookingTime;
			recipeFields.price = req.body.price;
			recipeFields.shortDescription = req.body.shortDescription.trim();
			recipeFields.longDescription = req.body.longDescription.trim();
			recipeFields.user = req.user._id;
			// optional
			recipeTags.length > 0 ? recipeFields.tags = recipeTags : null;
			recipeIngradients.length > 0 ? recipeFields.ingradients = recipeIngradients : null;

			new Recipe(recipeFields).save().then(recipe => {
				User.findById(req.user._id).then(user => {
					let userWithRecipe = user.recipes.unshift(recipe._id);
					user.save(userWithRecipe);
					res.json({success: true});
				});
			}).catch(e => res.json(e));
			// dietFields.title = req.body.title;
			// dietFields.kcal = req.body.kcal;
			// dietFields.type = req.body.type;
			// dietFields.description = req.body.description;
			// dietFields.user = req.user._id;
			// dietTags.length > 0 ? dietFields.tags = dietTags : '';
			// new Diet(dietFields).save().then(diet => {
			// 	res.json(diet);
			// 	User.findById(req.user._id).then(user => {
			// 		let userWithDiet = user.diets.unshift(diet._id);
			// 		User.findByIdAndUpdate(
			// 			{_id: req.user._id},
			// 			{$set: user},
			// 			{new: true})
			// 			.then(res => console.log('Diet added'));
			// 	});
			// });
		}
	});

// // @route   GET api/diets/:id
// // @desc    GET diet by id
// // @access  Private
// router.get(
// 	'/:id',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// find by ID and populate with user collection
// 		// return just id, avatar, name and nickname of user
// 		Diet.findById(req.params.id).populate('user')
// 			.then(diet => {
// 				const dietWithUser = {
// 					...diet._doc,
// 					user: {
// 						_id: diet.user._id,
// 						avatar: diet.user.avatar,
// 						name: diet.user.name,
// 						nickname: diet.user.nickname
// 					}
// 				};
// 				res.json(dietWithUser);
// 			})
// 			.catch(e => res.json(e));
// 	});

// // @route   GET api/diets/tags/:tag
// // @desc    GET diet by tag
// // @access  Private
// router.get(
// 	'/tags/:tag',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// find all and populate with user
// 		// return just id, avatar, name and nickname of user
// 		// check if tags contain tag
// 		Diet.find().populate('user')
// 			.then(diets => {
// 				let dietsByTags = []; // empty array
// 				diets.map(diet => { // map through array
// 					diet.tags.map((tag) => { // check if tags contains tag(req.params.tag)
// 						if(tag === req.params.tag) { // return diet with user
// 							let dietWithTagAndUser = {
// 								...diet._doc,
// 								user: {
// 									_id: diet.user._id,
// 									avatar: diet.user.avatar,
// 									name: diet.user.name,
// 									nickname: diet.user.nickname
// 								}
// 							};
// 							dietsByTags.unshift(dietWithTagAndUser);
// 						}
// 					});
// 				});
// 				res.json(dietsByTags);
// 			})
// 			.catch(e => res.json(e));
// 	});

// // @route   GET api/diets/kcal/:min/:max
// // @desc    GET diet by kcal min -> max
// // @access  Private
// router.get(
// 	'/kcal/:min/:max',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// find all and populate with user
// 		// return just id, avatar, name and nickname of user
// 		// check if kcal between min and max
// 		Diet.find().populate('user')
// 			.then(diets => {
// 				let dietsByKcal = []; // empty array
// 				diets.map(diet => { // map through array
// 					parseInt(diet.kcal) >= parseInt(req.params.min) &&
// 					parseInt(diet.kcal) <= parseInt(req.params.max) ?
// 						dietsByKcal.unshift({
// 							...diet._doc,
// 							user: {
// 								_id: diet.user._id,
// 								avatar: diet.user.avatar,
// 								name: diet.user.name,
// 								nickname: diet.user.nickname
// 							}
// 						})
// 						: null;
// 				});
// 				res.json(dietsByKcal);
// 			})
// 			.catch(e => res.json(e));
// 	});

// // @route   GET api/diets/type/:type
// // @desc    GET diet by type
// // @access  Private
// router.get(
// 	'/type/:type',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// find all and populate with user
// 		// return just id, avatar, name and nickname of user
// 		// check if type is equal req.params.type
// 		Diet.find().populate('user')
// 			.then(diets => {
// 				let dietsByTags = []; // empty array
// 				diets.map(diet => { // map through array
// 					diet.type === req.params.type ?
// 						dietsByTags.unshift({
// 							...diet._doc,
// 							user: {
// 								_id: diet.user._id,
// 								avatar: diet.user.avatar,
// 								name: diet.user.name,
// 								nickname: diet.user.nickname
// 							}
// 						})
// 						: null;
// 				});
// 				res.json(dietsByTags);
// 			})
// 			.catch(e => res.json(e));
// 	});

// // @route   POST api/diets
// // @desc    Add diet
// // @access  Private
// router.post(
// 	'/',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// required: title, kalories, type, description
// 		// if tags >> comma separated values >> array
// 		let dietFields = {};
// 		let dietTags = [];
// 		let errors = {};
	
// 		if(_.isEmpty(req.body.title)) {
// 			errors.title = 'Title is required.';
// 		} else if (
// 			req.body.title.trim().length < 5 || 
// 			req.body.title.trim().length > 50) 
// 		{
// 			errors.title = 'Title length between 5 and 50 characters.';
// 		}
	
// 		if(_.isEmpty(req.body.kcal)) {
// 			errors.kcal = 'Kalories are required.';
// 		} else if(!validator.isNumeric(req.body.kcal)){
// 			errors.kcal = 'Fill with correct data.';
// 		} else if (
// 			Number(req.body.kcal) < 1000 || 
// 			Number(req.body.kcal) > 10000) 
// 		{
// 			errors.kcal = 'Diets lower than 1000kcal or bigger than 10000kcal are unhelthy.';
// 		}
	
// 		if(_.isEmpty(req.body.type)) {
// 			errors.type = 'Type of diet is required.';
// 		}

// 		if(_.isEmpty(req.body.description)) {
// 			errors.description = 'Description is required.';
// 		} else if (
// 			req.body.description.trim().length < 50 ||
// 			req.body.description.trim().length > 2000 
// 		) {
// 			errors.description = 'Description between 50 and 2000 characters.';
// 		}

// 		if(!_.isEmpty(req.body.tags)) {
// 			dietTags = req.body.tags.trim().split(',');
// 			dietTags = dietTags.map(diet => {return diet.trim();});
// 		}

		
	
// 		if(!_.isEmpty(errors)) {
// 			res.json(errors);
// 		} else {
// 			dietFields.title = req.body.title;
// 			dietFields.kcal = req.body.kcal;
// 			dietFields.type = req.body.type;
// 			dietFields.description = req.body.description;
// 			dietFields.user = req.user._id;
// 			dietTags.length > 0 ? dietFields.tags = dietTags : '';
// 			new Diet(dietFields).save().then(diet => {
// 				res.json(diet);
// 				User.findById(req.user._id).then(user => {
// 					let userWithDiet = user.diets.unshift(diet._id);
// 					User.findByIdAndUpdate(
// 						{_id: req.user._id},
// 						{$set: user},
// 						{new: true})
// 						.then(res => console.log('Diet added'));
// 				});
// 			});
// 		}
// 	});


// // @route   POST update api/diets
// // @desc    Update diet
// // @access  Private
// router.post(
// 	'/:id',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// required: title, kalories, type, description
// 		// if tags >> comma separated values >> array
// 		Diet.findOne({_id: req.params.id})
// 			.then(diet => {
// 				if (diet) {
// 					if(diet.user.toString() === req.user._id.toString()){ // check if this is diet owner
// 						let dietFields = {};
// 						let dietTags = [];
// 						let errors = {};
				
// 						if(_.isEmpty(req.body.title)) {
// 							errors.title = 'Title is required.';
// 						} else if (
// 							req.body.title.trim().length < 5 || 
// 							req.body.title.trim().length > 50) 
// 						{
// 							errors.title = 'Title length between 5 and 50 characters.';
// 						}
				
// 						if(_.isEmpty(req.body.kcal)) {
// 							errors.kcal = 'Kalories are required.';
// 						} else if(!validator.isNumeric(req.body.kcal)){
// 							errors.kcal = 'Fill with correct data.';
// 						} else if (
// 							Number(req.body.kcal) < 1000 || 
// 						Number(req.body.kcal) > 10000) 
// 						{
// 							errors.kcal = 'Diets lower than 1000kcal or bigger than 10000kcal are unhelthy.';
// 						}
				
// 						if(_.isEmpty(req.body.type)) {
// 							errors.type = 'Type of diet is required.';
// 						}
			
// 						if(_.isEmpty(req.body.description)) {
// 							errors.description = 'Description is required.';
// 						} else if (
// 							req.body.description.trim().length < 50 ||
// 						req.body.description.trim().length > 2000 
// 						) {
// 							errors.description = 'Description between 50 and 2000 characters.';
// 						}
			
// 						if(!_.isEmpty(req.body.tags)) {
// 							dietTags = req.body.tags.trim().split(',');
// 							dietTags = dietTags.map(diet => {return diet.trim();});
// 						}
			
					
				
// 						if(!_.isEmpty(errors)) {
// 							res.json(errors);
// 						} else {
// 							dietFields.title = req.body.title;
// 							dietFields.kcal = req.body.kcal;
// 							dietFields.type = req.body.type;
// 							dietFields.description = req.body.description;
// 							dietFields.user = req.user._id;
// 							dietTags.length > 0 ? dietFields.tags = dietTags : '';
// 							Diet.findOneAndUpdate(
// 								{_id: req.params.id},
// 								{$set: dietFields},
// 								{new: true}
// 							)
// 								.then(updatedDiet => res.json(updatedDiet));
// 						}
// 					} else {
// 						res.status(400).json({auth: 'This is not your diet'});
// 					}
// 				} else {
// 					res.status(404).json({success: false});
// 				}
// 			})
// 			.catch(e => res.json({success: false}));
// 	});

// // @route   DELETE api/diets/:id
// // @desc    DELETE diet by id
// // @access  Private
// router.delete(
// 	'/:id',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {

// 		Diet.findById(req.params.id)
// 			.then(diet => {
// 				// if true this is your diet and you can delete this
// 				if(req.user._id.toString() === diet.user.toString()) {
// 					diet.remove().then(() => {
// 						res.json({success: true});
// 					});
// 				} else {
// 					res.status(400).json({success: false});
// 				}
// 			})
// 			.catch(e => res.json(e));
// 	});

module.exports = router;
