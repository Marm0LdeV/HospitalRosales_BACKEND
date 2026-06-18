import RegisterpacientesModel from "../models/Pacientes.js";

import {config} from "../../config.js"

//Creo un array de funcione
const registerPacientesController = {};

registerPacientesController.register = async (req, res) => {
    const{
        name,
        lastName,
        email,
        password,
        phone,
        address,
        phoneEmergencyContacts,
        profilePhoto,
        isVerified,
        loginAttempts,
        timeOut,
    } = req.body;
}

try {
    //Verificar si el paciente ya existe
    const existPaciente = await pacienteModel.findOne({email});
    if(existCustomer) {
        return res.status(400).json({message: "El paciente ya existe"})
    }
    const passwordHash = await bcryptjs.hash(password,10);

    const verificationCode = crypto.randombytes(3).toString("hex");

    //Genermos el token
    const tokenCode = JsonWebToken.sign(
        {
            name,
            lastName,
            email,
            verificationCode,
            passwordHash,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified,
            loginAttempts,
            timeOut,
        },
        config.JWT.secret,
        {expiresIn:"15m"}
    );
    res.cookie("verificationToken", tokenCode,{maxAge : 15* 60* 1000});

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email.user_email,
            pass:config.email.user_password,
        },
    });

    //#2 mailOptions -> ¿Quien lo recibe?
    const mailOptions = {
        from: config.email.user_email,
        to: email,
        subject: "verificacion de cuenta",
        text: "Para verificar tu cuenta, utiliza este código" + verificationCode + "expira en 15 minutos",
    };

    // #3- Enviar el correo 
    transporter.sendMail(mailOptions,(error, info) =>{
        if(error) {
            console.log ("error" + error);
            return res.status(500).json({message: "error"});
        }
    });
} catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "Internal server error"})
}

//Verificar el codigo que acabamos de mandar
registerPacientesController.verifyCode  = async (req, res) => {
    try {
        //1_ Solicitmaos el codigo qe escribieron en el frontend
        const {verificationCodeRequest} = req.body;

        //#2- Obtener el token de las cookies
        const token = req.cookies.verificationToken;

        //#3- ver que codigo esta en el token
        const decoded = JsonWebToken.verify(token,config.JWT.secret);
        const{
            name,
            lastName,
            email,
            verificationCode: storedCode,
            passwordHash,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified,
            loginAttempts,
            timeOut,
        } = decoded;

        //Paso final: comparar el código que el usuario escribe con el codigo que esta en el token
        if( ! verificationCodeRequest == storedCode) {
            return res.status(400).json({message: "Invalidcode"})
        }

        //Guardamos todo en la base de datos
        const newPaciente = new RegisterpacientesModel({
            name,
            lastName,
            email,
            verificationCode,
            Password: passwordHash,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified,
            loginAttempts,
            timeOut,
        });

        //Guardamos todo
        await newPaciente.save();

        //Si el codigo esta bien, entonces colocamos campo isVerified

        const paciente = await RegisterpacientesModel.findOne({email});
        CustomElementRegistry.isVerified = true;
        await CustomElementRegistry.save();

        res.json({message: "Email verificado exítosamente"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};
export default registerPacientesController;