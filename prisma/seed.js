require("dotenv/config");
const prisma = require("../src/databases/prisma");

const alunos = [
    { nome: "João da Silva", email: "joao@email.com" },
    { nome: "Maria Oliveira", email: "maria@email.com" },
    { nome: "Pedro Santos", email: "pedro@email.com" },
];

async function main(){  
    for(const aluno of alunos){
        await prisma.aluno.upsert({ where: { email: aluno.email }, update: {}, create: aluno });
    }
    console.log("Seed concluído.");
}

main().catch((e)=>{ console.error(e); process.exit(1); }).finally(()=> prisma.$disconnect());
