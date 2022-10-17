import { Router } from "express";
import { shorten, listUrlId, redirectUrl, deleteUrl, getUserMe, ranking } from "../controllers/urls.controlers.js"
import autorization from "../middlewares/autorization.middleware.js"
import { ValidaSchemaUrls } from "../middlewares/urls.middleware.js";

const routerurls = Router()

routerurls.post("/urls/shorten", ValidaSchemaUrls, autorization, shorten)
routerurls.get("/urls/:id", listUrlId)
routerurls.get("/urls/open/:shortUrl", redirectUrl)
routerurls.delete("/urls/:id", autorization, deleteUrl)
routerurls.get("/users/me", autorization, getUserMe)
routerurls.get("/ranking", ranking)

export default routerurls