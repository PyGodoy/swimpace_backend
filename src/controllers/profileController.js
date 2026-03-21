const pool = require('../config/db')

const getProfile = async (req, res) => {
    try {
        const result = await pool.query (
            'SELECT id, name, email, created_at FROM users WHERE id = $1',
            [req.usuario.id]
        )
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).json({error: "Erro ao buscar informações"});
    }
}

const putProfile = async (req, res) => {
    const {name, email} = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name,email,req.usuario.id]
        )
        res.status(200).json(result.rows[0]);
    } catch (e) {
        res.status(500).json({error: 'Erro ao atualizar dados'});
    }
}

module.exports = {
    getProfile,
    putProfile,
}