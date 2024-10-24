"use strict";
//aquí irá lo de la actualización periódica de las estadísticas
//import { getEstadisticas } from "../services/estadisticas.service.js";
import { AppDataSource } from "../config/configDb.js";
import { Estadisticas } from "../entity/estadisticas.entity.js";

//Guarda interacción del operador
export async function saveOperatorInteractionService(interactionData){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);
        //crea nueva interacción en la bd
        const newInteraction = estadisticasRepository.create(interactionData);
        //guarda la interacción
        await estadisticasRepository.save(newInteraction);
        return [newInteraction, null];

    } catch (error) {
        console.error("Error al guardar la interacción del operador:", error);
        return [null, "Error interno del servidor"];
    }
}

//Genera estadísticas por estaciones 
export async function getEstadisticasxEstacionesService(season){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);

        const estacionesEstadisticas = await estadisticasRepository.find({
            where: { season: season },
        });
        
        if (!estacionesEstadisticas || estacionesEstadisticas.length === 0) 
            return [null, "No hay estadísticas para la estación"];


    } catch (error) {
        console.error("Error al obtener las estadísticas por estaciones:", error);
        return [null, "Error interno del servidor"];
    }
}

//Obtiene estadisticas generales para mostrar los gráficos
export async function getGeneralEstadisticasService(){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);
        //obtiene todas las estadísticas generales para los gráficos
        const generalEstadisticas = await estadisticasRepository.find();

        if (!generalEstadisticas || generalEstadisticas.length === 0) 
            return [null, "No hay datos para mostrar en los gráficos"];

        //retorna las estadísticas generales
        return [generalEstadisticas, null];
    }catch (error) {
        console.error("Error al obtener las estadísticas generales:", error);
        return [null, "Error interno del servidor"];
    }
}

//Verifica acceso de un operador(admin)
export async function verifyOperatorAccessService(UserData){
    try {
        //verifica si el operador tiene rol de admin
        if (operador.role !== "administrador"){
            return [null, "Acceso denegado: No tienes permisos de administrador"];
        } 
        return [true, null];
    } catch (error) {
        console.error("Error al verificar el acceso del operador:", error);
        return [null, "Error interno del servidor"];
    }
}