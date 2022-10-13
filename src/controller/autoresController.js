import chalk from "chalk";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;
    autores.findById(id, (err, autores) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(autores);
      }
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body); 
    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - Falha ao cadastrar autor` });
        console.log(chalk.red("Falha ao cadastrar autor -> " + err));
      } else {
        res.status(201).send(autor.toJSON());
        console.log(chalk.yellow("Autor cadastrado com sucesso"));
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send("Autor atualizado com sucesso");
      } else {
        res.status(500).send(err.message);
      }
    });
  };

  static exluirAutor = (req, res) => {
    const id = req.params.id;

    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send("Autor removido com sucesso");
      } else {
        res.status(500).send(err.message);
      }
    });
  };
}

export default AutorController;
