import { Router } from "express";
import { shorten, listUrlId, redirectUrl } from "../controllers/urls.controlers.js"
import autorization from "../middlewares/autorization.middleware.js"
import { ValidaSchemaUrls } from "../middlewares/urls.middleware.js";

const routerurls = Router()

routerurls.post("/urls/shorten", ValidaSchemaUrls, autorization, shorten)
routerurls.get("/urls/:id", listUrlId)
routerurls.get("/urls/open/:shortUrl", redirectUrl)

export default routerurls