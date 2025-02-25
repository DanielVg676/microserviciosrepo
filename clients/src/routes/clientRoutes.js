import express from "express";
import {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getClients); // Obtener todos los clientes activos
router.get("/:id", getClientById); // Obtener un cliente por ID
router.post("/", createClient); // Crear un nuevo cliente
router.put("/:id", updateClient); // Actualizar un cliente por ID
router.delete("/:id", deleteClient); // Baja lógica de un cliente

export default router;
