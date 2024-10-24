"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import estadisticasRoutes from "./estadisticas.routes.js";
import invRoutes from "./inventario.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/estadisticas", estadisticasRoutes)
    .use("/inventario", invRoutes);

export default router;