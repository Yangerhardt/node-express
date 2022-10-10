// Arquivo destinado a conectar o banco de dados com a API

import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://yanger:123@alura.3igjzky.mongodb.net/alura-node"
);
// tirado do ATLAS em Connect e Connect Your Application
// o "alura-node" é o nome do database criado

let db = mongoose.connection;

export default db;
