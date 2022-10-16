import connection from "../databases/db.js"
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if( password !== confirmPassword) {
        res.sendStatus(422)
    }

    const existemail = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])

    if(existemail.rows.length > 0){
        res.sendStatus(409)
    }else{
        const hashDaSenha = bcrypt.hashSync(password, 10)
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hashDaSenha])
        res.sendStatus(201)
    }
    
}

const signin = async (req, res) => {
    const { email, password } = req.body

    const existemail = await connection.query(`SELECT id, password, name FROM users WHERE email = $1;`, [email])

    const senhaEvalida = bcrypt.compareSync(password, existemail.rows[0].password)

    if(existemail.rows.length > 0 && senhaEvalida){
        //retorna o uuid
        const token = uuid()
        await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [existemail.rows[0].id, token])
        res.status(200).send({token: token, name: existemail.rows[0].name})
    }else{
        res.sendStatus(401)
    }
    
}

const logout = async (req, res) => {
    
    const session = res.locals.existesession
    await connection.query(`DELETE FROM sessions WHERE "userId" = $1;`, [session.userId])
    res.sendStatus(200)
}

export { signup, signin, logout }