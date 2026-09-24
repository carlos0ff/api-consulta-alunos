const alunoService = require("../services/AlunoService");

class AlunoController{
    async findById(request, response){
        const aluno = await alunoService.findById(request.params.id);
        return response.status(200).json(aluno);
    }
}

module.exports = new AlunoController();
