//IMPORT
import pacientesModel from "../models/Pacientes.js";

import {v2 as cloudinary} from "cloudinary"; 

const pacientesController = {};

//SELECT
pacientesController.getPacientes = async (req, res) => {
    const pacientes = await pacientesModel.find();
    res.json(pacientes);
};

//DELETE
pacientesController.deletePacientes = async (req, res) => {
    try {
        const pacientesFound = await pacientesModel.findById(req.params.id);

        await cloudinary.uploader.destroy(pacientesFound.public_id);

        const pacientesDeleted = await pacientesModel.findByIdAndDelete(
            req.params.id,
        );
        if(!pacientesDeleted) {
            return res.status(404).json ({ message: "Paciente no encontrado"});
        }

        return res.status(204).json({message: "Paciente eliminado"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

//UPDATE
pacientesController.updatePacientes = async (req, res) => {
    try {
        const {
            name, 
            lastName,
            password,
            phone,
            address,
            phoneEmergencyContacts,
        } = req.body;

        const pacientesFound = await pacientesModel.findById(req.params.id);

        const updateData = {
            name, 
            lastName,
            password,
            phone,
            address,
            phoneEmergencyContacts,
        }; 

        if(req.file) {
            await cloudinary.uploader.destroy(pacientesFound.public_id);
        }
        updateData.profilePhoto = req.file.path;

        await deliveryDriverModel.findByIDAndUpdate(req.params.id, updateData,{
            new: true,
        });

        return res.status(200).json({message: "Paciente actualizado"});
    } catch {error} {
        console.log ("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
}; 

export default pacientesController;