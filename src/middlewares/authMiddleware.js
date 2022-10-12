import joi from "joi"
import schemaSignin from "../schemas/auth.schema.js"


async function ValidaschemaSignin(req, res, next) {
    const {name, email, password, confirmPassword} = req.body
  
      const validation = schemaSignin.validate({name, email, password, confirmPassword});
  
    if (validation.error) {
      return res.sendStatus(422);
    }
    next()
  }

  export {ValidaschemaSignin}