"use strict";
import { getBicicletasVentaMes } from "../services/estadisticasBici.service.js";
import { getBicicletasPorTipoMes } from "../services/estadisticasBici.service.js";
import { getBicicletasPorAroMes } from "../services/estadisticasBici.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Obtener bicicletas por tipo filtrado por meses
export async function getBicicletasPorTipoMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }

    try {
        const [bicicletasPorTipo, error] = await getBicicletasPorTipoMes(mesNumero);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por tipo y mes", error);
        }

        if (!bicicletasPorTipo || bicicletasPorTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", bicicletasPorTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener bicicletas a la venta filtrado por meses
export async function getBicicletasVentasMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }

    try {
        const [bicicletasVendidas, error] = await getBicicletasVentaMes(mesNumero);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas a la venta", error);
        }

        if (!bicicletasVendidas || bicicletasVendidas.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas a la venta registradas");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVendidas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por Aro filtrado por meses
export async function getBicicletasPorAroMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }

    try {
        const [bicicletasPorAro, error] = await getBicicletasPorAroMes(mesNumero);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro y mes", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}
