const Khoa = require('../models/khoa');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let khoas = await db.Khoa.findAll({raw:true});
    console.log(khoas)
    res.render('admins/khoas/index',{khoas})
}
module.exports.renderAdd = async (req, res, next) =>{
    res.render('admins/khoas/add');
}
module.exports.postKhoa = async (req, res, next) => {
    const nameK = req.body.nameK;
    const isKhoa = await db.Khoa.findOne({where:{nameK}});
    if(isKhoa){
       return  res.render('error',{msg:"đã có rồi,thêm lại đi",link:'khoa/add'})
    }
    let khoas = await db.Khoa.create({nameK});
    res.redirect('/khoa/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let khoa = await db.Khoa.findOne({where:{id}});
    res.render('admins/khoas/edit',{khoa})
}
module.exports.putEdit = async (req, res, next) =>{
    const id = req.params.id;
    // console.log(id)
    const nameK = req.body.nameK;
    const isKhoa = await db.Khoa.findOne({where:{nameK}});
    if(isKhoa){
       return  res.render('error',{msg:"đã có tên khoa này rồi,update lai đi",link:`khoa/edit/${id}`})
    }
    await db.Khoa.update({nameK},{where:{id}})
    res.redirect('/khoa')
}
module.exports.deleteKhoa = async (req, res) => {
    const id = req.params.id;
    await db.Khoa.destroy(
        {where:{id}
    })
    res.redirect('/khoa')
}
module.exports.postSearch = async (req, res) => {
    const nameK = req.body.nameK;
    let khoa = await db.Khoa.findOne({where: {nameK}})
    res.render('admins/khoas/search', {khoa})
}