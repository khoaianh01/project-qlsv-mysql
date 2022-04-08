const express = require('express');
const User = require('../controllers/user');
const user_router = express.Router();
const {isAdmin,validateUser} = require('../midlleware')
user_router
     .route('/')
     .get(User.renderLogin)
     .post(validateUser,User.postLogin)
user_router
     .route('/user/register')
     .get(User.renderRegister)
     .post(validateUser,User.postRegister);
user_router
     .route('/user/logout')
     
     .get(User.postLogout);
module.exports =user_router;