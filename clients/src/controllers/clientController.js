import Client from "../models/clientModel.js";

export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({ where: { status: true } });
        res.status(200).json(clients);
    } catch (error) {
        console.error("Error al listar Clientes:", error);
        res.status(500).json({ message: "Error al obtener los clientes" });
    }
};

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ message: "Error al obtener el cliente" });
    }
};

export const createClient = async (req, res) => {
    try {
        const { name, lastName, email, phone, birthDate, address } = req.body;
        const newClient = await Client.create({
            name,
            lastName,
            email,
            phone,
            birthDate,
            address,
            status: true, // Nuevo cliente siempre inicia activo
        });
        res.status(201).json(newClient);
    } catch (error) {
        console.error("Error al crear Cliente:", error);
        res.status(500).json({ message: "Error al crear el cliente" });
    }
};

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, email, phone, birthDate, address } = req.body;

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await client.update({ name, lastName, email, phone, birthDate, address });

        res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar Cliente:", error);
        res.status(500).json({ message: "Error al actualizar el cliente" });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);

        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await client.update({ status: false });

        res.status(200).json({ message: "Cliente dado de baja correctamente" });
    } catch (error) {
        console.error("Error al dar de baja Cliente:", error);
        res.status(500).json({ message: "Error al dar de baja el cliente" });
    }
};
