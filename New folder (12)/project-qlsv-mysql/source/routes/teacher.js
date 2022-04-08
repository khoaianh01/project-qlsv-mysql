const express = require('express');
const Teacher = require('../controllers/teacher');
const teacher_router = express.Router();
const {isAdmin,isLogin,validateTeacher} = require('../midlleware')
teacher_router
     .route('/')
     .get(isLogin,Teacher.renderHome);
teacher_router
     .route('/add')
     .get(isLogin,Teacher.renderAdd)
     .post(validateTeacher,Teacher.postTeacher)
teacher_router
     .route('/edit/:id')
     .get(isLogin,Teacher.renderEdit)
     .put(validateTeacher,Teacher.putEdit);
teacher_router
     .route('/delete/:id')
     .delete(Teacher.deleteTeacher)
teacher_router
     .route('/search')
     .post(Teacher.postSearch)
module.exports =teacher_router;