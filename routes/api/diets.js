const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

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
		Diet.findById(req.params.id)
			.then(diet => res.json(diet))
			.catch(e => res.json(e));
	});

// @route   POST api/diets
// @desc    Add diet
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		let dietFields = {};
		let errors = {};
	
		if(_.isEmpty(req.user._id)) {
			errors.userID = 'User ID is required';
		}
	
		if(_.isEmpty(req.body.title)) {
			errors.title = 'Title is required';
		}
	
		if(_.isEmpty(req.body.kcal)) {
			errors.kcal = 'Kalories are required';
		}
	
		if(_.isEmpty(req.body.type)) {
			errors.type = 'Type of diet is required';
		}
	
		if(!_.isEmpty(errors)) {
			res.json(errors);
		} else {
			dietFields.userID = req.user._id;
			dietFields.title = req.body.title;
			dietFields.kcal = req.body.kcal;
			dietFields.type = req.body.type;
			new Diet(dietFields).save().then(diet => res.json(diet));
		}
	});

// @route   GET api/posts
// @desc    Get posts
// @access  Public
// router.get('/', (req, res) => {
// 	Post.find()
// 		.sort({ date: -1 })
// 		.then(posts => res.json(posts))
// 		.catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
// });

// // @route   GET api/posts/:id
// // @desc    Get post by id
// // @access  Public
// router.get('/:id', (req, res) => {
// 	Post.findById(req.params.id)
// 		.then(post => res.json(post))
// 		.catch(err =>
// 			res.status(404).json({ nopostfound: 'No post found with that ID' })
// 		);
// });

// // @route   POST api/posts
// // @desc    Create post
// // @access  Private
// router.post(
// 	'/',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		const { errors, isValid } = validatePostInput(req.body);
// 	}
// );

module.exports = router;
