"use strict";
// Importar entidades
import User from "../entity/user.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import Inventario from "../entity/inventario.entity.js";
import Proveedores from "../entity/proveedores.entity.js";

import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        })
      ),
        userRepository.save(
          userRepository.create({
            nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
            rut: "20.630.735-8",
            email: "usuario2.2024@gmail.cl",
            password: await encryptPassword("user1234"),
            rol: "usuario",
          }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "usuario",
        }),
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

async function createBicicletasInitial() {
  try {
    // Repositorio
    const bicicletaRepo = AppDataSource.getRepository(Bicicleta);
    // Contabilizar
    const count = await bicicletaRepo.count();
    if (count > 0) return;
    // Crear
    await Promise.all([
      bicicletaRepo.save(
        bicicletaRepo.create({
          numeroSerie: "SN0001B",
          marca: "Bianchi",
          modelo: "Competicion",
          color: "Blanco",
          tipo: "Montaña",
          aro: 26,
          venta: 2000000
        })
      ),
    ])
    console.log("* => Bicicletas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear bicicletas:", error);
  }
}

async function createInventarioInitial() {
  try {
    // Repositorio
    const inventarioRepo = AppDataSource.getRepository(Inventario);
    // Contabilizar
    const count = await inventarioRepo.count();
    if (count > 0) return;
    // Crear
    await Promise.all([
      inventarioRepo.save(
        inventarioRepo.create({
          numeroSerie: "SN0001I",
          nombreStock: "Llanta",
          descripcionUnidad: "Llanta de bicicleta carrera",
          cantidadStock: 50,
          precioUnidad: 100000,
          marcaUnidad: "Bianchi",
          id_proveedor: 1,
          nombre_proveedor: "UtenciliosCorp",
          restockSugerido: 10,
          umbralMinimo: 10,
          // boolMateriales: false,
        })
      ),
    ])
    console.log("* => Inventario creado exitosamente");
  } catch (error) {
    console.error("Error al crear inventario:", error);
  }
}

async function createProveedoresInitial() {
  try {
    // Repositorio
    const proveedoresRepo = AppDataSource.getRepository(Proveedores);
    // Contabilizar
    const count = await proveedoresRepo.count();
    if (count > 0) return;
    // Crear
    await Promise.all([
      proveedoresRepo.save(
        proveedoresRepo.create({
          rut: "15.123.456-7",
          nombre: "UtenciliosCorp",
          email: "utencilios@gmail.cl",
          telefono: "+56912345678",
        })
      )
    ])
    console.log("* => Proveedores creados exitosamente");
  } catch (error) {
    console.error("Error al crear proveedores:", error);
  }
}
export { createUsers };
export { createBicicletasInitial };
export { createInventarioInitial };
export { createProveedoresInitial };