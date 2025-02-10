// Importando o módulo express para criar o roteador
const express = require("express");
// Criando uma instância do roteador do express
const router = express.Router();

// Rota para buscar todos os usuários
router.get("/", async (req, res) => {
    try {
        // Executando a query para buscar todos os usuários na tabela especificada
        const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME}`);
        // Retornando os resultados como JSON
        res.json(results);
    } catch (error) {
        // Exibindo erro no console e retornando status 500 em caso de falha
        console.error("Erro ao buscar usuários:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

// Rota para buscar um usuário pelo ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Executando a query para buscar o usuário pelo ID na tabela especificada
        const [results] = await req.pool.query(`SELECT * FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        // Verificando se o usuário foi encontrado
        if (results.length === 0) return res.status(404).send("Usuário não encontrado");
        // Retornando o usuário encontrado como JSON
        res.json(results[0]);
    } catch (error) {
        // Exibindo erro no console e retornando status 500 em caso de falha
        console.error("Erro ao buscar dados do usuário:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

// Rota para criar um novo usuário
router.post("/", async (req, res) => {
    const { name, email, cep, logradouro, bairro, cidade, estado, numero } = req.body;
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero)
        return res.status(400).send("Todos os campos são obrigatórios");

    try {
        // Verificando se o usuário com o email fornecido já existe
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE email = ?`, [email]
        );
        if (count > 0) return res.status(409).send("Usuário já existe");

        // Executando a query para inserir um novo usuário na tabela especificada
        const [insertResults] = await req.pool.query(
            `INSERT INTO ${process.env.DB_TABLENAME} (name, email, cep, logradouro, bairro, cidade, estado, numero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [name, email, cep, logradouro, bairro, cidade, estado, numero]
        );
        // Retornando o usuário criado como JSON com status 201
        res.status(201).json({ id: insertResults.insertId, name, email, cep, logradouro, bairro, cidade, estado, numero });
    } catch (error) {
        // Exibindo erro no console e retornando status 500 em caso de falha
        console.error("Erro ao inserir dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

// Rota para atualizar um usuário existente
router.put("/", async (req, res) => {
    const { id, name, email, cep, logradouro, bairro, cidade, estado, numero } = req.body;
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!id || !name || !email || !cep || !logradouro || !bairro || !cidade || !estado || !numero)
        return res.status(400).send("Todos os campos são obrigatórios");

    try {
        // Verificando se o usuário com o ID fornecido existe
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]
        );
        if (count === 0) return res.status(404).send("Usuário não encontrado");

        // Executando a query para atualizar o usuário na tabela especificada
        await req.pool.query(
            `UPDATE ${process.env.DB_TABLENAME} SET name = ?, email = ?, cep = ?, logradouro = ?, bairro = ?, cidade = ?, estado = ?, numero = ? WHERE id = ?`, 
            [name, email, cep, logradouro, bairro, cidade, estado, numero, id]
        );
        // Retornando o usuário atualizado como JSON com status 200
        res.status(200).json({ id, name, email, cep, logradouro, bairro, cidade, estado, numero });
    } catch (error) {
        // Exibindo erro no console e retornando status 500 em caso de falha
        console.error("Erro ao atualizar dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

// Rota para deletar um usuário existente
router.delete("/", async (req, res) => {
    const { id } = req.body;
    // Verificando se o ID foi fornecido
    if (!id) return res.status(400).send("ID é obrigatório");

    try {
        // Verificando se o usuário com o ID fornecido existe
        const [[{ count }]] = await req.pool.query(
            `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]
        );
        if (count === 0) return res.status(404).send("Usuário não encontrado");

        // Executando a query para deletar o usuário da tabela especificada
        await req.pool.query(`DELETE FROM ${process.env.DB_TABLENAME} WHERE id = ?`, [id]);
        // Retornando mensagem de sucesso com status 200
        res.status(200).send(`Usuário com ID ${id} removido com sucesso`);
    } catch (error) {
        // Exibindo erro no console e retornando status 500 em caso de falha
        console.error("Erro ao deletar dados:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

// Exportando o roteador para ser usado em outros arquivos
module.exports = router;
