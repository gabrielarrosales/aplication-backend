// testPrisma.js
import prisma from './prisma/prismaClient.js';

async function main() {
    try {
        const count = await prisma.services.count(); // ✅ Nombre correcto
        console.log(`Hay ${count} servicios en la base de datos`);
    } catch (error) {
        console.error('Error al obtener servicios:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();