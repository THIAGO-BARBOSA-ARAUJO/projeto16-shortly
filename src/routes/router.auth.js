import { Router } from "express";
import {signup} from "../controllers/auth.controller.js"
import {ValidaschemaSignin} from "../middlewares/authMiddleware.js"

const routerauth = Router()

routerauth.post("/signin", ValidaschemaSignin, signup)

export default routerauth