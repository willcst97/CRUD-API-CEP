const mysql = require("mysql2/promise");

const ConnectDB = async () => {
  // Conectar ao banco sem especificar um database
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS === "true",
    connectionLimit: parseInt(process.env.DB_CONNECTIONLIMIT, 10),
    queueLimit: parseInt(process.env.DB_QUEUELIMIT, 10),
  });

  // Criar o banco de dados se não existir
  await pool.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``
  );
  console.log(`Banco de dados ${process.env.DB_DATABASE} criado ou já existe.`);

  // Criar um novo pool apontando para o banco de dados recém-criado
  const dbPool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS === "true",
    connectionLimit: parseInt(process.env.DB_CONNECTIONLIMIT, 10),
    queueLimit: parseInt(process.env.DB_QUEUELIMIT, 10),
  });

  // Criar a tabela se não existir
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log(`Tabela ${process.env.DB_TABLENAME} criada ou já existe.`);

  return dbPool;
};

module.exports = ConnectDB;
