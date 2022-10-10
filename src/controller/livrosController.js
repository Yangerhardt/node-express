import chalk from "chalk";
import livros from "../models/Livro.js";

class LivroController {
  static listarLivos = (req, res) => { // Não foi especificado qual o método, se é um GET, PUT, etc...
    livros.find((err, livros) => { // Por isso, é necessário criar um arquivo de rotas para guiar caad um dos métodos
      res.status(200).json(livros);
    });
  };

  static cadastrarLivro = (req, res) => {
      let livro = new livros(req.body) // o "livros" segue o modelo do livroSchema, então podemos usar ele como referencia.
      livro.save((err) => { // SAVE usado para persistir os dados no banco
        if(err) {
          res.status(500).send({message: `${err.message} - Falha ao cadastrar livro`})
          console.log(chalk.red("Falha ao cadastrar livro -> " + err));
        } else {
          res.status(201).send(livro.toJSON())
          console.log(chalk.yellow("Livro cadastrado com sucesso"));
        }
      })
  }
}

export default LivroController;
