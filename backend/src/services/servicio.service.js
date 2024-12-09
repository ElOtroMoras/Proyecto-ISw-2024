"use strict";
import { AppDataSource } from "../config/configDb.js";
import Inventario from "../entity/inventario.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import User from "../entity/user.entity.js"; 

import Servicio from "../entity/servicio.entity.js";

export async function createServicioService(dataServicio) {
    try{
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const userRepository = AppDataSource.getRepository(User);
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const inventario = await inventarioRepository.findOne({ where: { numeroSerie: dataServicio.item } });

        if (!inventario) return [null, "Item no encontrado"];

        const user = await userRepository.findOne({ where: { rut: dataServicio.rut } });

        if (!user) return [null, "Usuario no encontrado"];

        const bicicleta = await bicicletaRepository.findOne({ where: { numeroSerie: dataServicio.bicicleta } });
        
        if (!bicicleta) return [null, "bicicleta no encontrada"];

        const newServicio = servicioRepository.create({
            bicicleta: dataServicio.bicicleta,
            item: dataServicio.item,
            rut: dataServicio.rut,
            tipo: dataServicio.tipo,
            valor: dataServicio.valor,
            descripcion: dataServicio.descripcion,
            duracionMins: dataServicio.duracionMins
        });

        const servicioSaved = await servicioRepository.save(newServicio);

        return [servicioSaved, null];

    }catch(error){
        console.error("Error al crear un servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllServiciosService() {
    try{
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicios = await servicioRepository.find();

        if(!servicios || servicios.length === 0) return [null, "No hay servicios registrados"];

        return [servicios, null];
    }catch(error){
        console.error("Error al obtener los servicios: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateServicioService(query, body) {
    try{
        const { id } = query;
    
            const inventarioRepository = AppDataSource.getRepository(Inventario);
            const userRepository = AppDataSource.getRepository(User);
            const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
            const servicioRepository = AppDataSource.getRepository(Servicio);
    
            const servicioFound = await servicioRepository.findOne({ where: { id: id } });
            if (!servicioFound) return [null, "Servicio no encontrado"];
    
            const inventario = await inventarioRepository.findOne({ where: { numeroSerie: body.item } });
            if (!inventario) return [null, "Item no encontrado"];
    
            const user = await userRepository.findOne({ where: { rut: body.rut } });
            if (!user) return [null, "Usuario no encontrado"];
    
            const bicicleta = await bicicletaRepository.findOne({ where: { numeroSerie: body.bicicleta } });
            if (!bicicleta) return [null, "Bicicleta no encontrada"];
    
            const dataServicio = {
                bicicleta: body.bicicleta,
                item: body.item,
                rut: body.rut,
                tipo: body.tipo,
                estado: body.estado,
                valor: body.valor,
                descripcion: body.descripcion,
                duracionMins: body.duracionMins,
                updatedAt: new Date(),
            };
    
            const result = await servicioRepository.update({ id: id }, dataServicio);
            console.log("Resultado de la actualización:", result);
    
            const servicioUpdated = await servicioRepository.findOne({ where: { id: id } });
    
            return [servicioUpdated, null];
        } catch (error) {
            console.error("Error al actualizar el servicio:", error.message, error.stack);
            return [null, "Error interno del servidor"];
        }
}

