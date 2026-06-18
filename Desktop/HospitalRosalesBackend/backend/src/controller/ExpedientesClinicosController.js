//IMPORT
import ExpedientesClinicosModel from "../models/Expedientes.js";

const ExpedientesClinicosController = {};

//SELECT
ExpedientesClinicosController.getExpedientesClinicos = async (req, res) => {
    const especialidades = await ExpedientesClinicosModel.find();
    res.json(especialidades);
};

//INSERT 
EspecialidadesController.inserExpedientsClinicos = async (req, res) => {
    const{patient_id,
        diagnosis,
        medications: [{ medicineName }],
        medicalNotes} = async (req,res) => {
                const especialidades = await new especialidades.save();
                res.json({message: "especialidades save"})
            }
}                        

//DELETE
EspecialidadesController.deleteexpedientesclinicos = async (req, res) => { 
    await EspecialidadesModel.findByIdAndDelete(req,params.id);
    res.json({message: "expedientes deleted"});
}

//UPDATE
EspecialidadesController.updateexpedientesclinicos = async (req, res) => {
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
                res.json({message: "expedientes updated"})
            )
}

export default EspecialidadesController;