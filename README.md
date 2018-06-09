# BeatKcal MERN FullStack APP

## Mateusz Skibicki - 2018

# Back-end - Node.js / MongoDB - dev on port 5000

Path to db in keys , connected with Mongoose.

Passport middleware to auth.

# REST API routes

- appURL

  - /api/users

    - / - GET all users
    - /id/:id - GET user by id
    - /:nickname - GET user by nickname
    - /register - POST register user
    - /login - POST login user
    - /current - GET ID / name / nickname / avatar of current logged in user
    - /all - GET all users
    - /delete - Delete user req.user.\_id

  - /api/posts

    - / - GET all posts
    - /:id - GET post by id
    - / - POST add post
    - /:id - DELETE delete post

  - /api/diets

    - / - GET all diets
    - /:id - GET one by ID
    - / - POST add diet

  - /api/recipies
  - /api/trainings

# ModelSchema - Mongoose

### Users

```javascript
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
```
