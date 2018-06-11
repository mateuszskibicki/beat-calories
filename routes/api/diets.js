const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const validator = require('validator');

// Post model
const Diet = require('../../models/Diet');

// @route   GET api/diets
// @desc    GET all diets
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Diet.find()
			.then(diets => res.json(diets))
			.catch(e => res.json(e));
	});

// @route   GET api/diets/:id
// @desc    GET diet by id
// @access  Private
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// find by ID and populate with user collection
		// return just id, avatar, name and nickname of user
		Diet.findById(req.params.id).populate('user')
			.then(diet => {
				const dietWithUser = {
					...diet._doc,
					user: {
						_id: diet.user._id,
						avatar: diet.user.avatar,
						name: diet.user.name,
						nickname: diet.user.nickname
					}
				};
				res.json(dietWithUser);
			})
			.catch(e => res.json(e));
	});

// @route   POST api/diets
// @desc    Add diet
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// required: title, kalories, type, description
		// if tags >> comma separated values >> array
		let dietFields = {};
		let dietTags = [];
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
		} else if(!validator.isNumeric(req.body.kcal)){
			errors.kcal = 'Fill with correct data.';
		} else if (
			Number(req.body.kcal) < 1000 || 
			Number(req.body.kcal) > 10000) 
		{
			errors.kcal = 'Diets lower than 1000kcal or bigger than 10000kcal are unhelthy.';
		}
	
		if(_.isEmpty(req.body.type)) {
			errors.type = 'Type of diet is required.';
		}

		if(_.isEmpty(req.body.description)) {
			errors.description = 'Description is required.';
		} else if (
			req.body.description.trim().length < 50 ||
			req.body.description.trim().length > 2000 
		) {
			errors.description = 'Description between 50 and 2000 characters.';
		}

		if(!_.isEmpty(req.body.tags)) {
			dietTags = req.body.tags.trim().split(',');
		}

		
	
		if(!_.isEmpty(errors)) {
			res.json(errors);
		} else {
			dietFields.userID = req.user._id;
			dietFields.userNickname = req.user.nickname;
			dietFields.userAvatar = req.user.avatar;
			dietFields.title = req.body.title;
			dietFields.kcal = req.body.kcal;
			dietFields.type = req.body.type;
			dietFields.description = req.body.description;
			dietFields.user = req.user._id;
			dietTags.length > 0 ? dietFields.tags = dietTags : '';
			new Diet(dietFields).save().then(diet => res.json(diet));
		}
	});

// @route   DELETE api/diets/:id
// @desc    DELETE diet by id
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {

		let userID = req.user._id;

		Diet.findById(req.params.id)
			.then(diet => {
				// if true this is your diet and you can delete this
				if(userID.toString() === diet.userID.toString()) {
					diet.remove().then(() => res.json({success: true}));
				} else {
					res.status(400).json({success: false});
				}
			})
			.catch(e => res.json(e));
	});

module.exports = router;
