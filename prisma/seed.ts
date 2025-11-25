import bcrypt from "bcrypt";
import { prisma } from "../src/middlewares/prisma";

async function main() {

//   // --- 1. Roles ---
//   await prisma.rol.createMany({
//     data: [
//       { id_rol: 1, nombre_rol: "Encargado" },
//       { id_rol: 2, nombre_rol: "Veterinario" }
//     ],
//     skipDuplicates: true
//   });

  // --- Hash de la contraseña ---
  const hashedPassword = await bcrypt.hash("asd123", 10);

  // --- 2. Usuarios ---
  await prisma.usuario.createMany({
    data: [
      {
        id_rol: 1,
        nombre: "Gonzalo",
        apellido: "Lima",
        dni: "44441308",
        email: "limagonzalo0@gmail.com",
        contrasena: hashedPassword
      }
    ],
    skipDuplicates: true
  });

//   // --- 3. Métodos de pago ---
//   await prisma.metodo_pago.createMany({
//     data: [
//       { nombre_metodo_pago: "Efectivo" },
//       { nombre_metodo_pago: "Tarjeta" },
//       { nombre_metodo_pago: "Transferencia" }
//     ],
//     skipDuplicates: true
//   });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
