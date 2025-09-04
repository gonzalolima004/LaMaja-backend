const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const clientes = await prisma.Rol.findMany();
    console.log('Clientes en la base de datos:', clientes);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
