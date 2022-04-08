const express = require('express');

const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const { Sequelize } = require('sequelize');
const khoaRoute = require('./routes/khoa');
const lopRoute = require('./routes/lop');
const studentRoute = require('./routes/student');
const teacherRoute = require('./routes/teacher');
const qlddRoute = require('./routes/qldd');
const qldRoute = require('./routes/qld');
const subjectRoute = require('./routes/subject');
const userLogin = require('./routes/user');
const {serializeUser,deserializeUser} = require('./midlleware')
const autJwt = require('./midlleware');
const sequelize = new Sequelize('6P4KRNGFaz', '6P4KRNGFaz', '2LemUcMr1X', {
    host: 'remotemysql.com',
    dialect:  'mysql',
  });
async function connect(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
 } 
connect();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
  // console.log('1')
  serializeUser(req,res,next)
 
  // next()
})
app.use((req,res,next)=>{
  // console.log('2')
  deserializeUser(req,res,next)
})
app.use((req,res,next)=>{
  // console.log('3')
  res.locals.user = req.user; 
  
  // console.log(req.cookies.access_token)
  next()
})
app.use('/',userLogin);
app.use('/khoa',khoaRoute);
app.use('/lop',lopRoute);
app.use('/student',studentRoute);
app.use('/teacher',teacherRoute);
app.use('/qldd',qlddRoute);
app.use('/subject',subjectRoute);
app.use('/qld',qldRoute);

// app.get('/',(req,res)=>{
//     res.render('admins/khoa');
// })
app.listen('2001',(req,res)=>{
    console.log('listening on http://localhost:2001')
})
