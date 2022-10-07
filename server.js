import app from "./src/app.js";

const porta = process.env.PORT || 3000; // ou a porta no ambiente de produção ou a porta no local storage

app.listen(porta, () => {
  console.log(`Servidor escutando em http://localhost:${porta}`);
});
