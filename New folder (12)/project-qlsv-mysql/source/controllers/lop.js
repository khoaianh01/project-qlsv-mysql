const Lop = require('../models/lop');
const db = require('../models/index');

module.exports.renderHome = async (req, res, next) =>{
    let lops = await db.Lop.findAll({raw:true});
    console.log(lops)
    res.render('admins/lops/index',{lops})
}
module.exports.renderAdd = async (req, res, next) =>{
    res.render('admins/lops/add');
}
module.exports.postLop= async (req, res, next) => {
    const nameL = req.body.nameL;
    const isLop = await db.Lop.findOne({where:{nameL}});
    if(isLop){
       return  res.render('error',{msg:"đã có lớp học rồi,thêm lại đi",link:'lop/add'})
    }
    let lops = await db.Lop.create({nameL});
    res.redirect('/lop/add')
}
module.exports.renderEdit = async (req, res, next) =>{
    const id = req.params.id;
    let lop = await db.Lop.findOne({where:{id}});
    res.render('admins/lops/edit',{lop})
}
module.exports.putEdit = async (req, res, next) =>{
    const id = req.params.id;
    // console.log(id)
    const nameL = req.body.nameL;
    const isLop = await db.Lop.findOne({where:{nameL}});
    if(isLop){
       return  res.render('error',{msg:"đã có lớp học này rồi,update lại đi",link:`lop/edit/${id}`})
    }
   
    await db.Lop.update({nameL},{where:{id}})
    res.redirect('/lop')
}
module.exports.deleteLop = async (req, res) => {
    const id = req.params.id;
    await db.Lop.destroy(
        {where:{id}
    })
    res.redirect('/lop')
}
module.exports.postSearch = async (req, res) => {
    const nameL = req.body.nameL;
    let lop = await db.Lop.findOne({where: {nameL}})
    res.render('admins/lops/search', {lop})
}