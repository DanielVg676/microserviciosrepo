import User from "../models/userModel.js";
import { userCreatedEvent } from "../services/rabbitServices.js";
import jwt from "jsonwebtoken";

//OBTENER UN REGISTRO DE LA BD A TRAVES DE UNA ID

export const getUsers=async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        console.error('Error al listar usuarios:', error);
        res.status(500)
            .json({message: 'Error al obtener los usuarios'});
    }
};

// CREAR UN NUEVO USUARIO

export const createUsers = async (req, res) => {
    const { password, username, phone } = req.body;

    if (!phone || !username || !password) {
        return res.status(400).json({ message: 'Teléfono, correo y contraseña son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'El teléfono debe tener 10 dígitos numéricos' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    try {
        const userByPhone = await User.findOne({ where: { phone } });

        const userByUsername = await User.findOne({ where: { username } });

        if (userByPhone || userByUsername) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        const newUser = await User.create({
            phone,
            username,
            password,
            status: true,
            creationDate: new Date(),
        });

        console.log(newUser);
        //Aqui se añade lo de nuestro servicio de rabbitServices.js para que se registre en la queue
        await userCreatedEvent(newUser);
        return res.status(201).json({ message: 'Usuario creado', data: newUser });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
};




// ACTUALIZAR UN USUARIO A TRAVES DE UNA ID EN LA URL

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {phone, password} = req.body;
    

    try{
        const userByPhone = await User.findOne({ where: { phone } });
        const user = await User.findByPk(id);
        
        if (!user){
            return res.status(400).json({message: "Error en la obtención del usuario, vuelva a intentarlo"});
        }
        if (userByPhone) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        }
        await user.update({
            phone:phone || user.phone,
            password:password || user.password
        });
        return res.status(200).json({ message: 'Usuario actualizado', data: user});

    } catch(error) {
        console.error('Error al editar el usuario:', error);
        res.status(500)
            .json({message: `Error al editar el usuario con la id: ${id}`});
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await user.destroy();
        return res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ message: `Error al eliminar el usuario con ID: ${id}` });
    }
};

// DAR DE BAJA UN USUARIO - ELIMINAR USUARIO
export const changeStateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await user.update({ status: false });
        return res.status(200).json({ message: "El usuario ha sido dado de baja correctamente" });

    } catch (error) {
        console.error("Error al dar de baja al usuario:", error);
        return res.status(500).json({ message: `Error al dar de baja al usuario con la ID: ${id}` });
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ mensaje: "Username y password son requeridos" });
        }

        // Buscar usuario en la BD
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        // Comparar contraseñas (SIN ENCRIPTAR)
        if (user.password !== password) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const SECRET_KEY = process.env.SECRET_KEY || "aJksd9QzPl+sVdK7vYc/L4dK8HgQmPpQ5K9yApUsj3w=";

        // Generar JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};
