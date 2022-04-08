const Joi = require("joi");

module.exports.khoaModel = Joi.object({
    nameK:Joi.string().required(),
   
  });
module.exports.lopModel = Joi.object({
    nameL:Joi.string().required()
})
module.exports.qlddModel = Joi.object({
    sbv:Joi.number().required()
})
module.exports.qldModel = Joi.object({
    diem:Joi.number().required()
})
module.exports.studentModel = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    ngaysinh: Joi.string().required()

})
module.exports.subjectModel = Joi.object({
    nameS:Joi.string().required()
})
module.exports.teacherModel = Joi.object({
    nameT:Joi.string().required(),
    phone: Joi.string().required(),
    trinhdo: Joi.string().required()

})
module.exports.userModel = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})