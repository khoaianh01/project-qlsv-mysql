const Student = require('../models/student');
const Lop = require('../models/lop');
const Khoa = require('../models/khoa');
const db = require('../models/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports.renderHome = async (req, res, next) =>{
    let students = await db.Student.findAll(
        {
            include:[
                {model:db.Lop},
                // {model:db.Khoa}
            ],
            // raw:true
    })
    console.log(students)
    res.render('admins/students/index',{students})
}
module.exports.renderAdd = async (req, res, next) =>{
    let lops = await db.Lop.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    // let khoas = await db.Khoa.findAll(
    //     {
    //         // include:[
    //         //     {model:db.Lop},
    //         //     {model:db.Khoa}
    //         // ],
    //         raw:true
    // })
    res.render('admins/students/add',{lops});
}
module.exports.postStudent= async (req, res, next) => {
   
    const {name, email,gender,ngaysinh,LopId}= req.body;
    const isStudent = await db.Student.findOne({where: {[Op.or]: [{name}, {email}]}});
    if(isStudent){
       return  res.render('error',{msg:"đã có  học sinh này r,thêm lại đi",link:'student/add'})
    }
    let students = await db.Student.create({name, email,gender,ngaysinh,LopId});
    res.redirect('/student/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let student = await db.Student.findOne({where:{id}});
    let lops = await db.Lop.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    
    res.render('admins/students/edit',{student,lops})
}
module.exports.putEdit = async (req, res, next) =>{
    const {id} = req.params;
    // console.log(id)
    const {name, email,gender,ngaysinh,LopId} = req.body;
 
   
    await db.Student.update({name, email,gender,ngaysinh,LopId},{where:{id}})
    res.redirect('/student')
}
module.exports.deleteStudent = async (req, res) => {
    const id = req.params.id;
    await db.Student.destroy(
        {where:{id}
    })
    res.redirect('/student')
}
module.exports.postSearch = async (req, res) => {
    const name = req.body.name;
    let student = await db.Student.findOne({
        include:[
            {model:db.Lop},
            // {model:db.Khoa}
        ],
      
    },{where: {name}})
    console.log(student)
    res.render('admins/students/search', {student})
}