/*  Campos:
    specialityName
    description 
    isAvailable
*/
import mongoose, { Schema, model} from "mongoose";

const EspecialidadesSchema = new Schema (
    {
        specialityName: {type: String},
        description: {type: String},
        isAvailable: {type: Boolean},

    }
)

    export default model ("Especialidades", EspecialidadesSchema);
