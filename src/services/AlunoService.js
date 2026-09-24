const prisma = require("../databases/prisma");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");

class AlunoService{
    async findById(id){
        const aluno = await prisma.aluno.findUnique({
            where: { id },
            select: { id: true, nome: true, email: true },
        });
        if(!aluno){
            throw new AlunoNaoEncontradoError();
        }
        return aluno;
    }
}

module.exports = new AlunoService();
