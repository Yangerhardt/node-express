import mongoose from "mongoose";
const { Schema } = mongoose;

const livroSchema = new Schema({
  id: { type: String },
  titulo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: true, 
  },
  editora: { type: String, required: true },
  numeroPaginas: { type: Number },
});

const livros = mongoose.model("livros", livroSchema); // Já foi criado no banco de dados a coleção com nome de livros,
// porém se não tivesse criado, o mongoose criaria agora com este formato o banco de dados.

export default livros;
