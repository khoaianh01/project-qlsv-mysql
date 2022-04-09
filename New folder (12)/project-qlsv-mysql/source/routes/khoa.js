const express = require('express');
const Khoa = require('../controllers/khoa');
const khoa_router = express.Router();
const {isAdmin,isLogin,validateKhoa} = require('../midlleware')
khoa_router
     .route('/')
     .get(isLogin,Khoa.renderHome);
khoa_router
     .route('/add')
     .get(isLogin,Khoa.renderAdd)
     .post(validateKhoa,Khoa.postKhoa)
khoa_router
     .route('/edit/:id')
     .get(isLogin,Khoa.renderEdit)
     .put(validateKhoa,Khoa.putEdit);
khoa_router
     .route('/delete/:id')
     .delete(isLogin,Khoa.deleteKhoa)
khoa_router
     .route('/search')
     .post(Khoa.postSearch)
module.exports =khoa_router;