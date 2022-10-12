import joi from "joi"

const schemaSignin = joi.object({
    name: joi.string()
    .required(),

    email: joi.string()
    .required(),

    password: joi.string()
    .required(), 

    confirmPassword: joi.string()
    .required()
}).options({ abortEarly: false })

export default schemaSignin