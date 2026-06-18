/*  Campos:
    patient_id
    diagnosis
    medications [{ medicineName }]
    medicalNotes
*/
import mongoose, { Schema, model} from "mongoose";

const EquiposMedicosSchema = new Schema (
    {
        patient_id: {type: mongoose.Schema.Types.ObjectId, ref: "Patients"},
        Diagnosis: {type: String},
        medications: [
            {
                medicineName: {type: String}
            }
        ],
        medicalNotes: {type: String},
    }
)

    export default model ("Equiposmedicos", EquiposMedicosSchema);