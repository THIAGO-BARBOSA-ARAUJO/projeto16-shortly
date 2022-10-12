import joi from "joi"

const schemaSignup = joi.object({
    name: joi.string()
    .required(),

    email: joi.string()
    .required(),

    password: joi.string()
    .required(), 

    confirmPassword: joi.string()
    .required()
}).options({ abortEarly: false })

const schemaSignin = joi.object({

    email: joi.string()
    .required(),

    password: joi.string()
    .required(), 

}).options({ abortEarly: false })

export {schemaSignup, schemaSignin}