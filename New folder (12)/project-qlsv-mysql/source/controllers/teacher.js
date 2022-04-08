const Teacher = require('../models/teacher');
consKhoa = require('../models/lop');
const Khoa = require('../models/khoa');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let teachers = await db.Teacher.findAll(
        {
            include:[
                {model:db.Khoa}, 
            ],
            // raw:true
    })
    console.log(teachers)
    res.render('admins/teachers/index',{teachers})
}
module.exports.renderAdd = async (req, res, next) =>{
    // let lops = await db.Lop.findAll(
    //     {
    //         // include:[
    //         //     {model:db.Lop},
    //         //     {model:db.Khoa}
    //         // ],
    //         raw:true
    // })
    let khoas = await db.Khoa.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    res.render('admins/teachers/add',{khoas});
}
module.exports.postTeacher= async (req, res, next) => {
   
    const {nameT, phone,trinhdo,KhoaId}= req.body;
    console.log(req.body);
    const isTeacher = await db.Teacher.findOne({where: {nameT}});
    if(isTeacher){
       return  res.render('error',{msg:"đã có rồi giáo viên này r,thêm lại đi",link:'teacher/add'})
    }
    let teachers = await db.Teacher.create({nameT, phone,trinhdo,KhoaId});
    res.redirect('/teacher/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let teacher = await db.Teacher.findOne({where:{id}});
    let khoas = await db.Khoa.findAll(
        {
            // include:[
            //     {model:dKhoa},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
   
    res.render('admins/teachers/edit',{teacher,khoas})
}
module.exports.putEdit = async (req, res, next) =>{
    const {id} = req.params;
    // console.log(id)
    const {nameT, phone,trinhdo,KhoaId} = req.body;
  
    await db.Teacher.update({nameT, phone,trinhdo,KhoaId},{where:{id}})
    res.redirect('/teacher')
}
module.exports.deleteTeacher = async (req, res) => {
    const id = req.params.id;
    await db.Teacher.destroy(
        {where:{id}
    })
    res.redirect('/teacher')
}
module.exports.postSearch = async (req, res) => {
    const nameT = req.body.nameT;
    let teacher = await db.Teacher.findOne({include:{
        model:db.Khoa
    }},{where: {nameT}})
    
    res.render('admins/teachers/search', {teacher})
}