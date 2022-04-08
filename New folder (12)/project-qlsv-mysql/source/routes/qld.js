const express = require('express');
const Qld = require('../controllers/qld');
const qld_router = express.Router();
const {isAdmin,isLogin,validateQld} = require('../midlleware')
qld_router
     .route('/')
     .get(isLogin,Qld.renderHome);
qld_router
     .route('/add')
     .get(isLogin,Qld.renderAdd)
     .post(validateQld,Qld.postQld)
qld_router
     .route('/edit/:id')
     .get(isLogin,Qld.renderEdit)
     .put(validateQld,Qld.putEdit);
qld_router
     .route('/delete/:id')
     .delete(Qld.deleteQld)
// qld_router
//      .route('/search')
//      .post(Qld.postSearch)
module.exports =qld_router;