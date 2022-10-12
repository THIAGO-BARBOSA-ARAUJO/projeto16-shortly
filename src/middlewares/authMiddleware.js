import joi from "joi"
import {schemaSignup, schemaSignin} from "../schemas/auth.schema.js"


async function ValidaschemaSignup(req, res, next) {
    const {name, email, password, confirmPassword} = req.body
  
      const validation = schemaSignup.validate({name, email, password, confirmPassword});
  
    if (validation.error) {
      return res.sendStatus(422);
    }
    next()
  }

async function ValidaschemaSignin(req, res, next) {
  const { email, password } = req.body

    const validation = schemaSignin.validate({ email, password });

  if (validation.error) {
    return res.sendStatus(422);
  }
  next()
}

  export {ValidaschemaSignup, ValidaschemaSignin}