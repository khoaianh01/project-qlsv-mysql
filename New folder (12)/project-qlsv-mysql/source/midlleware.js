const jwt = require("jsonwebtoken");

const db = require("./models/index");
const khoa = require("./models/khoa");
const Lop = require("./models/lop");
const Student = require('./models/student');
const Subject = require('./models/subject');
const Qld = require('./models/qld');
const Qldd = require('./models/qldd');
const Teacher = require('./models/teacher');
const {khoaModel,lopModel,qlddModel,qldModel,studentModel,subjectModel,teacherModel,userModel} = require('./joiModel')
const User = require('./models/user')

module.exports.verifyToken = (req, res, next) => {
 
  let token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, 'haianh123', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
module.exports.isAdmin = async (req, res, next) => {
  await db.User.findOne(req.userId).then(user => {
   
        if (user.role === "Admin") {
          next();
          return;
        }
   
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });

};
module.exports.isLogin = async (req, res, next) => {
  console.log(req.userId)
  if(req.userId){
   next();
   return;
  }
  res.redirect('/')
}
module.exports.serializeUser = (req,res,next)=>{
  
  let token = req.cookies.access_token;
 
  if (!token) {
   return next()
  }
  jwt.verify(token, 'haianh123', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    
  });

  next();
}
module.exports.deserializeUser = async (req,res,next)=>{
  if(!req.userId) {
    return next()
  }
  let user = await db.User.findOne({where: {id: req.userId}});
  req.user = user;
  next();
}
module.exports.validateKhoa = (req, res, next) => {
  const { error } = khoaModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateLop = (req, res, next) => {
  const { error } = lopModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateQld = (req, res, next) => {
  const { error } = qldModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateQldd = (req, res, next) => {
  const { error } = qlddModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateStudent = (req, res, next) => {
  const { error } = studentModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}

module.exports.validateSubject = (req, res, next) => {
  const { error } = subjectModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateTeacher = (req, res, next) => {
  const { error } = teacherModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}
module.exports.validateUser = (req, res, next) => {
  const { error } = userModel.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      res.send(msg);
  } else {
      next();
  }
}