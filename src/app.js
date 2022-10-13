import express from "express";
/* const express = require('express') */
import chalk from "chalk";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

// Antes de criar o app, criamos a conexão com o banco de dados:
db.on("error", console.log.bind(chalk.red("Erro de conexão")));
//O bind serve para unir os erros que podem ocorrer no banco de dados e trazê-los pro terminal
db.once("open", () => {
  console.log(chalk.green("Conexão com o banco feita com sucesso."));
});
//o ONCE e o OPEN servem para realizar a conexão com o banco de dados.

const app = express();
app.use(express.json());
routes(app);

export default app;

// o intuito do arquivo APP é para inicializar o express, a conexão com o banco e as rotas
// 1) tentar conectar com o banco
// 2) criar uma instância do express
// 3)passar o routes(app) para que as rotas sejam direcionadas.
