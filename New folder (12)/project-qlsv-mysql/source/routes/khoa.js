const express = require('express');
const Khoa = require('../controllers/khoa');
const khoa_router = express.Router();
const {isAdmin,validateKhoa} = require('../midlleware')
khoa_router
     .route('/')
     .get(Khoa.renderHome);
khoa_router
     .route('/add')
     .get(Khoa.renderAdd)
     .post(validateKhoa,Khoa.postKhoa)
khoa_router
     .route('/edit/:id')
     .get(Khoa.renderEdit)
     .put(validateKhoa,Khoa.putEdit);
khoa_router
     .route('/delete/:id')
     .delete(Khoa.deleteKhoa)
khoa_router
     .route('/search')
     .post(Khoa.postSearch)
module.exports =khoa_router;