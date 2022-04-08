const User = require('../models/user');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports.renderLogin = async (req, res, next) =>{
    res.render('user/login')
}
module.exports.renderRegister = async (req, res, next) =>{
    res.render('user/register')
}
module.exports.postRegister = async (req, res, next) =>{
    const isChkeck = await db.User.findOne({where:{email: req.body.email}});
 
    if(isChkeck){
        res.redirect('/user/register');
    }
    const salt = await bcrypt.genSalt(6);
    const hast = await bcrypt.hash(req.body.password,salt);
 
  const user =  await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hast,
        salt: salt,
        role:'teacher'
      }).then(user=>{
          if(user){
            const token = jwt.sign({ id: user.id }, 'haianh123', {
                expiresIn: 86400 // 24 hours
              });
              res.cookie('access_token', token, {
                maxAge: 365 * 24 * 60 * 60 * 100
            })
              res.redirect('/student')
          }
      }).catch(err =>{  
        res.redirect('/user/register');
      })
    
}
module.exports.postLogin = async (req, res, next) =>{
   await db.User.findOne({
        where: {
          username: req.body.username
        }
      })
        .then(async (user) => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          const isCheck  = await bcrypt.compare(req.body.password,user.password);
          
          if (!isCheck) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          var token = jwt.sign({ id: user.id }, 'haianh123', {
            expiresIn: 86400 // 24 hours
          });
          res.cookie('access_token', token, {
            maxAge: 365 * 24 * 60 * 60 * 100,
            // httpOnly: true,
            // secure: true;
        })
        res.redirect('/student')
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
}
module.exports.postLogout = (req, res,next) => {
  res.clearCookie('access_token');
  delete req.userId; 
  console.log('---------',req.userId)
  res.redirect('/')
}