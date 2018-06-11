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
- /current - GET ID / name / nickname / avatar of current logged in user
- /all - GET all users
- /delete - Delete user req.user.\_id

## **/api/posts**

## **/api/diets**

- / - GET all diets
- /:id - GET one diet by ID
- / - POST add diet and populate with user
- /:id - DELETE diet by ID

## **/api/recipies**

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
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);
});
```
