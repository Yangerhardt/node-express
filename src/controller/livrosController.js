import chalk from "chalk";
import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    // Não foi especificado qual o método, se é um GET, PUT, etc...
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        // Por isso, é necessário criar um arquivo de rotas para guiar caad um dos métodos
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if (err) {
          res.status(400).send(err.message);
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora

    livros.find({"editora": editora}, {}, (err, livros) => {
      if (!err) {
        res.status(200).send(livros);
      } else {
        res.status(500).send(err.message);
      }
    })
  }

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body); // o "livros" segue o modelo do livroSchema, então podemos usar ele como referencia.
    livro.save((err) => {
      // SAVE usado para persistir os dados no banco
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao cadastrar livro` });
        console.log(chalk.red("Falha ao cadastrar livro -> " + err));
      } else {
        res.status(201).send(livro.toJSON());
        console.log(chalk.yellow("Livro cadastrado com sucesso"));
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send("Livro atualizado com sucesso");
      } else {
        res.status(500).send(err.message);
      }
    });
  };

  static exluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send("Livro removido com sucesso");
      } else {
        res.status(500).send(err.message);
      }
    });
  };
}

/* Quase todos os métodos do CRUD com o MONGO são baseados no índice do elemento e possuem
funções para modificar,alterar ou deletar esse elemento baseado no seu índice.
*/

export default LivroController;
