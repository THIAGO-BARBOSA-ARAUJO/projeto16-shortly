import connection from "../databases/db.js"
import { nanoid } from 'nanoid'



const shorten = async (req, res) => {
    const { url } = req.body
    const short = nanoid(6)
    await connection.query(`INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3);`, [short, url, res.locals.existesession.userId])
    res.status(200).send({shortUrl: short})
}

const listUrlId = async (req, res) => {
    const { id } = req.params
    
    try {
        const urlid = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1;`, [id])
        if(urlid.rows.length <= 0) return res.sendStatus(404)

        return res.status(200).send(urlid.rows[0])
    } catch (error) {
        return res.sendStatus(500)
    }
}


const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params

    try {
        const short = await connection.query(`SELECT id, url, "visitCount" FROM urls WHERE "shortUrl" = $1;`, [shortUrl])
        if(short.rows.length <= 0) return res.sendStatus(404)

        let count = short.rows[0].visitCount + 1
        
        await connection.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2;`, [count, short.rows[0].id])

        res.redirect(short.rows[0].url)
    } catch (error) {
        return res.sendStatus(500)
    }
}

const deleteUrl = async (req, res) => {
    const { id } = req.params

    const { userId } = res.locals.existesession
    try {
        const urlpertenceusuario = await connection.query(`SELECT * FROM urls WHERE id = $1;`, [id])
        console.log(urlpertenceusuario.rows.length)
        if(urlpertenceusuario.rows.length <= 0) return res.sendStatus(404)
        const {rows: [{userId: userIdSessions}]} = urlpertenceusuario
        //console.log(userIdSessions)

        if(userId !== userIdSessions){
            return res.sendStatus(401)
        }

        connection.query(`DELETE FROM urls WHERE id = $1;`, [id])
        return res.sendStatus(204)

    } catch (error) {
        return res.sendStatus(500)
    }
}

const getUserMe = async (req, res) => {
    const sessions = res.locals.existesession
    try {
        const urls = await connection.query(`SELECT users.id AS userid, users.name, urls.id, urls."shortUrl", urls.url, urls."visitCount" 
        FROM users
        JOIN urls
        ON users.id = urls."userId" WHERE users.id = $1
        ;`, [sessions.userId])

        console.log(urls.rows.length)
        if(urls.rows.length <= 0) return res.sendStatus(404)

        if(sessions.userId !== urls.rows[0].userid) return res.sendStatus(404)

        let count = 0
        for(let i = 0; i < urls.rows.length ; i++){
            count += urls.rows[i].visitCount
        }

        const short = urls.rows.map((url) => {
            return {
                id: url.id,
                shortUrl: url.shortUrl,
                url: url.url,
                visitCount: url.visitCount 
            }
        })
        

        return res.status(200).send({id: urls.rows[0].userid, name: urls.rows[0].name, visitCount: count, shortenedUrls: short})
    } catch (error) {
        console.log(error)
       return res.sendStatus(500)
    }
}

const ranking = async (req, res) => {
    try {
        const rank = await connection.query(`SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", SUM(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls
        ON users.id = urls."userId"
        GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10
        ;`)
        res.status(200).send(rank.rows)
    } catch (error) {
        res.sendStatus(500)
    }
}

export { shorten, listUrlId, redirectUrl, deleteUrl, getUserMe, ranking }