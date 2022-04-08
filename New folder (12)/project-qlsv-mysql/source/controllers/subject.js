const Subject = require('../models/subject');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let subjects = await db.Subject.findAll({raw:true});
    console.log(subjects)
    res.render('admins/subjects/index',{subjects})
}
module.exports.renderAdd = async (req, res, next) =>{
    res.render('admins/subjects/add');
}
module.exports.postSubject= async (req, res, next) => {
    const nameS = req.body.nameS;
    const isSubject = await db.Subject.findOne({where: {nameS}});
    if(isSubject){
       return  res.render('error',{msg:"đã có môn học  này r,thêm lại đi",link:'subject/add'})
    }
    let subjects = await db.Subject.create({nameS});
    res.redirect('/subject/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let subject = await db.Subject.findOne({where:{id}});
    res.render('admins/subjects/edit',{subject})
}
module.exports.putEdit = async (req, res, next) =>{
    const id = req.params.id;
    // console.log(id)
    const nameS = req.body.nameS;
    const isSubject = await db.Subject.findOne({where: {nameS}});
    if(isSubject){
       return  res.render('error',{msg:"đã có môn học  này r,update lại đi",link:`subject/edit/${id}`})
    }
   
    await db.Subject.update({nameS},{where:{id}})
    res.redirect('/subject')
}
module.exports.deleteSubject = async (req, res) => {
    const id = req.params.id;
    await db.Subject.destroy(
        {where:{id}
    })
    res.redirect('/subject')
}
module.exports.postSearch = async (req, res) => {
    const nameS = req.body.nameS;
    let subject = await db.Subject.findOne({where: {nameS}})
    res.render('admins/subjects/search', {subject})
}