/*  Campos:
    patient_id
    speciality_id
    appointmentDate
    reason
    status
    observations
*/
import mongoose, { Schema, model} from "mongoose";

const CitasMedicasSchema = new Schema (
    {
        patient_id: {type: mongoose.Schema.Types.ObjectId, ref: "Patients"},
        speciality_id: {type: mongoose.Schema.Types.ObjectId, ref: "speciality"},
        appointmentDate: {type: String},
        reason: {type: String},
        status: {type: String},
        observations: {type: String}
    }
)

    export default model ("CitasMedicas", CitasMedicasSchema);