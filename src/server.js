import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authrouter from "./routes/router.auth.js"
import routerurls from "./routes/router.urls.js"

dotenv.config()
const server = express()

server.use(cors())
server.use(express.json())
server.use(authrouter)
server.use(routerurls)

server.get("/status", (req, res) => {
    res.sendStatus(200)
})

server.listen(process.env.PORT, () => console.log("Server running on port 4000"))