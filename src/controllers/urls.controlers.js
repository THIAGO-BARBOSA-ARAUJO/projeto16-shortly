import connection from "../databases/db.js"
import { nanoid } from 'nanoid'



const shorten = async (req, res) => {
    const { url } = req.body
    
    const short = nanoid()
    await connection.query(`INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1, $2, $3);`, [short, url, res.locals.existesession.rows[0].id])
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




export { shorten, listUrlId, redirectUrl }