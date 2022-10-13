import connection from "../databases/db.js"

async function autorization(req, res, next) {
    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')
    
    if(!token) return res.sendStatus(401)

    const existesession = await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])

    if(existesession.rows.length <= 0) return res.sendStatus(401)

    res.locals.existesession = existesession

    next()
  }

  export default autorization