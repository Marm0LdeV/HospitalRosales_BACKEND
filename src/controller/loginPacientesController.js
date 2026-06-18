import pacientesModel from "../models/Pacientes.js"

import {config} from  "../../config.js";

const loginPacientesController = {};



loginPacientesController.login = async (req, res) => {
    try {
        //Solicitar los datos
        const { email, password} = req.body;
        const userFound = await pacientesModel.findOne({email});

        if(!userFound) {
            return res.status(404).json({message: "Paciente no encontrado"});
        }

        //Validar la contraseña
        const isMatch = await bcrypt.compare(password,userFound.password);

        if(!isMatch) {
            //Sumar intentos si la contraseña es erronea
            userFound.loginAttemps = (userFound.loginAttemps || 0) + 1;
        }

        //Bloquear cuenta despues de 5 intentos
        if(userFound.loginAttemps >= 5) {
            userFound.timeOut=Date.now()+ 15 * 60 * 1000;

            userFound.loginAttemps = 0;
            await userFound.save();

            return res.status(403).json({message: "Cuenta bloqueada"});
        }

        await userFound.save();
        return res.status(401).json({message: "Contraseña incorrecta"})

    } catch (error) {
        
    }
}

