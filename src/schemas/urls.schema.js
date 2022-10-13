import joi from "joi"

const schemaUrls = joi.object({
    url: joi.string()
    .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
    .required()

}).options({ abortEarly: false })

export default schemaUrls