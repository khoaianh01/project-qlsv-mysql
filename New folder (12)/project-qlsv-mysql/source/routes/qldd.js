const express = require('express');
const Qldd = require('../controllers/qldd');
const qldd_router = express.Router();
const {isAdmin,isLogin,validateQldd} = require('../midlleware')
qldd_router
     .route('/')
     .get(isLogin,Qldd.renderHome);
qldd_router
     .route('/add')
     .get(isLogin,Qldd.renderAdd)
     .post(validateQldd,Qldd.postQldd)
qldd_router
     .route('/edit/:id')
     .get(isLogin,Qldd.renderEdit)
     .put(validateQldd,Qldd.putEdit);
qldd_router
     .route('/delete/:id')
     .delete(Qldd.deleteQldd)
// qldd_router
//      .route('/search')
//      .post(isLogin,Qldd.postSearch)
module.exports =qldd_router;