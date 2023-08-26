const joi = require('joi');


const signValidation = (data) => {
    const schema = joi.object({
        username: joi.string().required().min(4),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required().min(6).max(15)
    });

    return schema.validate(data);
}


const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().required().email().min(6).max(255),
        password: joi.string().required().min(6).max(15)
    })

    return schema.validate(data)
}


module.exports.signValidation = signValidation
module.exports.loginValidation = loginValidation