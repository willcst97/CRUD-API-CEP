const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME}`);
        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

router.post("/", async (req, res) => {
    const { name, email, cep, logradouro, bairro, cidade, estado, numero } = req.body;
    if (!name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero)
        return res.status(400).send("Todos os campos são obrigatórios");

    try {
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE email = ?`, [email]
        );
        if (count > 0) return res.status(409).send("Usuário já existe");

        const [insertResults] = await req.pool.query(
            `INSERT INTO ${process.env.DB_TABLENAME} (name, email, cep, logradouro, bairro, cidade, estado, numero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [name, email, cep, logradouro, bairro, cidade, estado, numero]
        );
        res.status(201).json({ id: insertResults.insertId, name, email, cep, logradouro, bairro, cidade, estado, numero });
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

router.put("/", async (req, res) => {
    const { id, name, email, cep, logradouro, bairro, cidade, estado, numero } = req.body;
    if (!id || !name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero)
        return res.status(400).send("Todos os campos são obrigatórios");

    try {
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]
        );
        if (count === 0) return res.status(404).send("Usuário não encontrado");

        await req.pool.query(
            `UPDATE ${process.env.DB_TABLENAME} SET name = ?, email = ?, cep = ?, logradouro = ?, bairro = ?, cidade = ?, estado = ?, numero = ? WHERE id = ?`, 
            [name, email, cep, logradouro, bairro, cidade, estado, numero, id]
        );
        res.status(200).json({ id, name, email, cep, logradouro, bairro, cidade, estado, numero });
    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).send("ID é obrigatório");

    try {
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]
        );
        if (count === 0) return res.status(404).send("Usuário não encontrado");

        await req.pool.query(`DELETE FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        res.status(200).send(`Usuário com ID ${id} removido com sucesso`);
    } catch (error) {
        console.error("Erro ao deletar dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

module.exports = router;
