#######
TODO :
work on avatar default
likes diets*done and comments*done /

likes recipies /

likes inside profile\* done and populate, now change way how to send request with current user

User model or diffrent model maybe privateProfile part with kg, age, address etc
#######

# BeatKcal **MERN** FullStack APP

## Mateusz Skibicki - 2018

# Back-end - **Node.js / MongoDB** - dev on port 5000

MongoDB - Mongoose / Express.js / React and Redux / Node.js

MERN Stack app - Beat Kalories - social media with posts, diets, recipies, info about BMI and BMR, trainings, user autorization etc.

Built with boilerplate based on MERN Stack course I've seen on UDEMY. (https://www.udemy.com/mern-stack-front-to-back/learn/v4/overview). My ESLint config in .eslintrc.js .

Changes in my project:

- req.body validattion in routes, not separated

# **REST API routes**

## **/api/users**

- / - GET all users
- /id/:id - GET user by id
- /:nickname - GET user by nickname
- /register - POST register user
- /login - POST login user
- /current - GET current logged user
- /all - GET all users
- /delete - Delete user req.user.\_id

## **/api/posts**

## **/api/diets**

- / - GET all diets
- /:id - GET one diet by ID
- /tags/:tag - GET diets by tag
- /kcal/:min/:max - GET diets by kcal min and max
- /type/:type - GET diet by type
- / - POST add diet
- /:id - POST update diet
- /:id - DELETE diet by ID
- /comments/:id - POST create comment, diet :id

\*\* delete diet !!!!

- /likes/:id - POST like on unlike diet

## **/api/recipies**

- / - GET all recipes
- /:id - GET by ID
- /tags/:tag - GET by 1 tag
- /price/:price - GET by price
- /lifestyle/:lifestyle - GET by lifestyle
- / - POST add recipe
- /:id - POST update recipe
- /:id - DELETE recipe by ID
- /comments/:id - POST create comment, recipe :id
- /comments/:recipeID/:commentID - DELETE delete comment
- /likes/:id - POST like on unlike recipe

## **/api/trainings**

# ModelSchema - Mongoose

### Users

```javascript
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
});
```
