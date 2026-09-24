require("dotenv/config");
const express = require("express");
const alunoRouter = require("./routes/alunoRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use("/alunos", alunoRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`));
