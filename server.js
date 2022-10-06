const http = require("http");
const porta = 3000;

const rotas = {
  "/": "Curso de Node",
  "/livros": "Entrei na pagina de lirvos",
  "/autores": "Entrei na pagina de autores",
  "/editora": "pagina de editora",
  "/sobre": "info sobre o projeto",
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end(rotas[req.url]);
});

server.listen(porta, () => {
  console.log(`Servidor escutando em http://localhost:${porta}`);
});
