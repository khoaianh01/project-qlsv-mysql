const Qld = require('../models/qld');
const Subject = require('../models/subject');
const Student = require('../models/student')
const Lop = require('../models/lop');
const Khoa = require('../models/khoa');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let qlds = await db.Qld.findAll(
        {
            include:[
                {model:db.Subject},
                {model:db.Student}
                
            ],
            // raw:true
    })
    console.log(qlds)
    res.render('admins/qlds/index',{qlds})
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
    res.render('admins/qlds/add',{students,subjects});
}
module.exports.postQld= async (req, res, next) => {
   
    const {StudentId,SubjectId,diem}= req.body;
   
    let qlds = await db.Qld.create({StudentId,SubjectId,diem});
    res.redirect('/qld/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let qld = await db.Qld.findOne({where:{id}});
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
    res.render('admins/qlds/edit',{qld,subjects,students})
}
module.exports.putEdit = async (req, res, next) =>{
    const {id} = req.params;
    // console.log(id)
    const {StudentId,SubjectId,diem} = req.body;
  
    await db.Qld.update({StudentId,SubjectId,diem},{where:{id}})
    res.redirect('/qld')
}
module.exports.deleteQld = async (req, res) => {
    const id = req.params.id;
    await db.Qld.destroy(
        {where:{id}
    })
    res.redirect('/qld')
}
// module.exports.postSearch = async (req, res) => {
//     const name = req.body.name;
//     let qld = await db.Qld.findOne({
//         include:[
//             {model:db.Student},
//             {model:db.Subject}
//         ],
      
//     },{where: {name}})
//     console.log(qld)
//     res.render('admins/qlds/search', {qld})
// }