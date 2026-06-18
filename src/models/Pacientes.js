/*  Campos:
    
    name
    lastName
    email
    password
    phone
    address
    phoneEmergencyContacts[{ phone, nameEmergencyContact}]
    profilePhoto
    isVerified
    loginAttempts
    timeOut
*/
import mongoose, { Schema, model} from "mongoose";

const pacientesSchema = new Schema (
    {
        name: {type: String},
        lastName: {type: String},
        email: {type: String},
        password: {type: String},
        phone: {type: String},
        address: {type: String},
        phoneEmergencyContacts: [
            {
                phone: {type: String},
                nameEmergencyContact: {type: String}
            }
        ],
        profilePhoto: {type: String},
        isVerified: {type: Boolean},
    },
    {
        timestamps: true,
        strict: false
    })

    export default model ("pacientes", pacientesSchema);

