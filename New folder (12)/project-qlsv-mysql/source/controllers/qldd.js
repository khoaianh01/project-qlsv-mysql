const Qldd = require('../models/qldd');
const Subject = require('../models/subject');
const Student = require('../models/student')
const Lop = require('../models/lop');
const Khoa = require('../models/khoa');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let qldds = await db.Qldd.findAll(
        {
            include:[
                {model:db.Subject},
                {model:db.Student}
                
            ],
            // raw:true
    })
    console.log(qldds)
    res.render('admins/qldds/index',{qldds})
}
module.exports.renderAdd = async (req, res, next) =>{
    let students = await db.Student.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    let subjects = await db.Subject.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    res.render('admins/qldds/add',{students,subjects});
}
module.exports.postQldd= async (req, res, next) => {
   
    const {StudentId,SubjectId,sbv}= req.body;
   
    let qldds = await db.Qldd.create({StudentId,SubjectId,sbv});
    res.redirect('/qldd/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const {id} = req.params;
    let qldd = await db.Qldd.findOne({where:{id}});
    let subjects = await db.Subject.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    let students = await db.Student.findAll(
        {
            // include:[
            //     {model:db.Lop},
            //     {model:db.Khoa}
            // ],
            raw:true
    })
    res.render('admins/qldds/edit',{qldd,subjects,students})
}
module.exports.putEdit = async (req, res, next) =>{
    const {id} = req.params;
    // console.log(id)
    const {StudentId,SubjectId,sbv} = req.body;
  
   const qldd =  await db.Qldd.update({StudentId,SubjectId,sbv},{where:{id}})
   console.log(qldd)
    res.redirect('/qldd')
}
module.exports.deleteQldd = async (req, res) => {
    const id = req.params.id;
    await db.Qldd.destroy(
        {where:{id}
    })
    res.redirect('/qldd')
}
// module.exports.postSearch = async (req, res) => {
//     const name = req.body.name;
//     let qldd = await db.Qldd.findOne({
//         include:[
//             {model:db.Lop},
//             {model:db.Khoa}
//         ],
      
//     },{where: {name}})
//     console.log(qldd)
//     res.render('admins/qldds/search', {qldd})
// }