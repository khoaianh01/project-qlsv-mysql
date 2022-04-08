const express = require('express');
const Lop = require('../controllers/lop');
const lop_router = express.Router();
const {isAdmin,isLogin,validateLop} = require('../midlleware')
lop_router
     .route('/')
     .get(isLogin,Lop.renderHome);
lop_router
     .route('/add')
     .get(isLogin,Lop.renderAdd)
     .post(validateLop,Lop.postLop)
lop_router
     .route('/edit/:id')
     .get(isLogin,Lop.renderEdit)
     .put(validateLop,Lop.putEdit);
lop_router
     .route('/delete/:id')
     .delete(isLogin,Lop.deleteLop)
lop_router
     .route('/search')
     .post(isLogin,Lop.postSearch)
module.exports =lop_router;