const pool = require('../config/db')

const getSaves = async (req,res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM saves WHERE user_id = $1 ORDER BY created_at DESC',
            [req.usuario.id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar dados salvos"})
    }
}

const postSaves = async (req,res) => {
    console.log('body recebido:', req.body);
    try {
        const {title, distance, time, pace, speed} = req.body;
        console.log('dados:', title, distance, time, pace, speed);
        const result = await pool.query(
            'INSERT INTO saves (user_id, title, distance, time, pace, speed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [req.usuario.id, title, distance, time, pace, speed]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('erro sql:', error.message);
        res.status(500).json({error: "Erro ao salvar dados"});
    }
}

const deleteSaves = async (req,res) => {
    try {
        const {id} = req.params
        const result = await pool.query(
            'DELETE FROM saves WHERE id = $1 and user_id = $2',
            [id, req.usuario.id]
        );
        res.status(201).json({message: "Save deletado com sucesso"});
    } catch (error) {
        res.status(500).json({error: "Erro ao deletar dados"});    
    }
}

module.exports = {
    getSaves,
    postSaves,
    deleteSaves,
}