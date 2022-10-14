import { Router } from "express";
import {signup, signin} from "../controllers/auth.controller.js"
import {ValidaschemaSignup, ValidaschemaSignin} from "../middlewares/authMiddleware.js"

const routerauth = Router()

routerauth.post("/signup", ValidaschemaSignup, signup)
routerauth.post("/signin", ValidaschemaSignin, signin)

export default routerauth


