// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Rota para buscar endereço pelo CEP
app.get('/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o CEP' });
  }
});

// Rota para listar usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Rota para adicionar usuário
app.post('/users', (req, res) => {
  const { nome, email, telefone, cep, logradouro, bairro, cidade, estado } = req.body;
  const sql = 'INSERT INTO users (nome, email, telefone, cep, logradouro, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, email, telefone, cep, logradouro, bairro, cidade, estado], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
