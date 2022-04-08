const express = require('express');
const Student = require('../controllers/student');
const student_router = express.Router();
const {isAdmin,isLogin,validateStudent} = require('../midlleware')

student_router
     .route('/')
     .get(isLogin,Student.renderHome);
student_router
     .route('/add')
     .get(isLogin,Student.renderAdd)
     .post(validateStudent,Student.postStudent)
student_router
     .route('/edit/:id')
     .get(isLogin,Student.renderEdit)
     .put(validateStudent,Student.putEdit);
student_router
     .route('/delete/:id')
     .delete(isLogin,Student.deleteStudent)
student_router
     .route('/search')
     .post(Student.postSearch)
module.exports =student_router;