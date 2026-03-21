const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const create = async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const userExists = await pool.query (
            'SELECT id FROM users WHERE email = $1',
            [email]
        );
        if (userExists.rows.length > 0) {
            return res.status(400).json({error: 'Email ja cadastrado'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING id,name,email',
            [name,email,hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Erro ao se cadastrar"});
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;
    try {

        const result = await pool.query (
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(401).json({error: 'Email ou senha invalidos'});
        }

        const user = result.rows[0];

        const senhaCorreta = await bcrypt.compare(password, user.password);
        if (!senhaCorreta) {
            return res.status(401).json({error: "Email ou senha inválidos"});
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
        res.json({token});
    } catch (error) {
        res.status(500).json({error: 'Erro ao fazer login'});
    }
}

module.exports = {
    create,
    login,
}