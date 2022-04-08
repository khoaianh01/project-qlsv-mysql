const express = require('express');
const Subject = require('../controllers/subject');
const subject_router = express.Router();
const {isAdmin,isLogin,validateSubject} = require('../midlleware')
subject_router
     .route('/')
     .get(isLogin,Subject.renderHome);
subject_router
     .route('/add')
     .get(isLogin,Subject.renderAdd)
     .post(validateSubject,Subject.postSubject)
subject_router
     .route('/edit/:id')
     .get(isLogin,Subject.renderEdit)
     .put(validateSubject,Subject.putEdit);
subject_router
     .route('/delete/:id')
     .delete(Subject.deleteSubject)
subject_router
     .route('/search')
     .post(Subject.postSearch)
module.exports =subject_router;