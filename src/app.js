import express from "express";
import produtos from "./db.js";
/* const express = require('express') */
const app = express();
app.use(express.json());

const livros = [
  { id: 1, titulo: "O Senhor dos Anéis" },
  { id: 2, titulo: "O Hobbit" },
];

// Aqui estamos descrevendo os endpoints que teremos

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

app.get("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id) 
  res.json(livros[index]) 
});

// Aqui começam os verbos de alteração

app.post("/livros", (req, res) => {
  livros.push(req.body); // Aqui pegamos todo o corpo da requisição e cadastramos ele no nosso array de livros.
  res.status(201).send("Livro foi cadastrado com sucesso.");
});

app.put("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id) // Aqui pegamos o id da requisição através do endpoint. Usando o req.params conseguimos pegar o que é passado no endpoint.
  livros[index].titulo = req.body.titulo // Aqui pegamos a alteração que vem através do corpo da requisição, com o mesmo nome que o parâmetro do elemento a ser alterado.
  res.json(livros) // por fim, devolvemos o array já alterado.
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id); // O findIndex sempre é executado junto de uma função callback.
}

app.delete("/livros/:id", (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id) 
  livros.splice(index, 1)
  res.send(`Livro ${id} removido com sucesso`)
});

export default app;

/* app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(porta, () => {
  console.log(`Escutando app na posta https://localhost:${porta}`);
}) */
