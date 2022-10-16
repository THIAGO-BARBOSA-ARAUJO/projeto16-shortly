import { Router } from "express";
import {signup, signin, logout} from "../controllers/auth.controller.js"
import {ValidaschemaSignup, ValidaschemaSignin} from "../middlewares/authMiddleware.js"
import autorization from "../middlewares/autorization.middleware.js"

const routerauth = Router()

routerauth.post("/signup", ValidaschemaSignup, signup)
routerauth.post("/signin", ValidaschemaSignin, signin)
routerauth.delete("/logout",autorization, logout)

export default routerauth


