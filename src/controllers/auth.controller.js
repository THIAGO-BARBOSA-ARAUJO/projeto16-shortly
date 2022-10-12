import connection from "../databases/db.js"

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if( password !== confirmPassword) {
        res.sendStatus(422)
    }

    const existemail = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])

    if(existemail.rows.length > 0){
        res.sendStatus(409)
    }else{
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])
        res.sendStatus(201)
    }
    
}

export { signup }