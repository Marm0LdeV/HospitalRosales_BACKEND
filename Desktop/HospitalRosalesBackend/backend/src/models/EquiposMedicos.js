/*  Campos:
    equipmentName
    description
    brand 
    model 
    purchaseDate
    maintananceDate
    condition 
    image 
    status
    isAvailable
*/
import mongoose, { Schema, model} from "mongoose";

const EquiposMedicosSchema = new Schema (
    {
        equipmentName: {type: String},
        description: {type: String},
        brand: {type: String},
        model: {type: String},
        purchaseData: {type: String},
        maintananceDate: {type: String},
        condition: {type: String},
        image: {type: String},
        status: {type: String},
        isAvailable: {type: boolean}

    }
)

    export default model ("Equiposmedicos", EquiposMedicosSchema);