//IMPORT
import EspecialidadesModel from "../models/Pacientes.js";

const EspecialidadesController = {};

//SELECT
EspecialidadesController.getEspecialidades = async (req, res) => {
    const especialidades = await EspecialidadesModel.find();
    res.json(especialidades);
};

//INSERT 
EspecialidadesController.insertEspecialidades = async (req, res) => {
    const{specialityName,
            description ,
            isAvailable,} = async (req,res) => {
                const especialidades = await new especialidades.save();
                res.json({message: "Especialidades save"})
            }
}                        

//DELETE
EspecialidadesController.deleteEspecialidades = async (req, res) => { 
    await EspecialidadesModel.findByIdAndDelete(req,params.id);
    res.json({message: "Especialidades deleted"});
}

//UPDATE
EspecialidadesController.updateEspecialidades = async (req, res) => {
    const {specialityName,
            description ,
            isAvailable} = req.body;
            await EspecialidadesModel.findByIdAndUpdate(
                req.params.id,
                {
                specialityName,
                description ,
                isAvailable,
                },
                {new: true},
                res.json({message: "Especialidades updated"})
            )
}

export default EspecialidadesController;