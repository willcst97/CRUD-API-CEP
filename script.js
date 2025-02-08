alert("teste")

const express = require('express');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definição do modelo Endereco
const Endereco = sequelize.define('Endereco', {
  cep: { type: DataTypes.STRING, allowNull: false },
  logradouro: DataTypes.STRING,
  bairro: DataTypes.STRING,
  cidade: DataTypes.STRING,
  estado: DataTypes.STRING
});

sequelize.sync();

// Rota para buscar CEP na API ViaCEP
app.get('/buscar/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) return res.status(404).json({ erro: 'CEP não encontrado' });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar CEP' });
  }
});

// CRUD - Criar endereço
app.post('/enderecos', async (req, res) => {
  const endereco = await Endereco.create(req.body);
  res.json(endereco);
});

// Listar endereços
app.get('/enderecos', async (req, res) => {
  const enderecos = await Endereco.findAll();
  res.json(enderecos);
});

// Atualizar endereço
app.put('/enderecos/:id', async (req, res) => {
  await Endereco.update(req.body, { where: { id: req.params.id } });
  res.json({ mensagem: 'Endereço atualizado' });
});

// Deletar endereço
app.delete('/enderecos/:id', async (req, res) => {
  await Endereco.destroy({ where: { id: req.params.id } });
  res.json({ mensagem: 'Endereço removido' });
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001 🚀'));
